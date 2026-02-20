<?php

namespace App\Services\NovelScraping\Drivers\Examples;

use App\Contracts\NovelSiteDriver;
use DOMDocument;
use DOMXPath;
use Illuminate\Support\Facades\Http;

/**
 * ExampleNovelDriver (TEMPLATE)
 *
 * Copy this file into:
 *   app/Services/NovelScraping/Drivers/Local/<YourSite>Driver.php
 *
 * Then fill the TODO sections:
 * - supports(): site domain match
 * - parseChapters(): chapter list extraction
 * - parseContent(): content extraction
 *
 * Optional:
 * - implement an archive endpoint strategy (like Novelbin's ajax chapter-archive)
 * - implement basic anti-rate-limit retries (429)
 */
class ExampleNovelDriver implements NovelSiteDriver
{
    private const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    public static function siteUrl(): string { return 'https://example-novel-site.com/'; }
    public static function logo(): string { return ''; } // e.g. 'images/sites/example.png'

    public function supports(string $url): bool
    {
        $host = parse_url($url, PHP_URL_HOST) ?? '';
        $host = strtolower($host);

        // TODO: change domain check
        return str_contains($host, 'example-novel-site.com');
    }

    public function parseChapters(string $novelUrl): array
    {
        $html  = $this->fetchHtmlWithRetry($novelUrl);
        $xpath = $this->makeXpath($html);

        /**
         * TODO: Replace this selector for your site.
         * Common pattern: list of chapter links
         */
        $nodes = $xpath->query("//a[contains(@href,'chapter')]");

        $chapters = [];

        if ($nodes) {
            foreach ($nodes as $node) {
                $href = trim($node->getAttribute('href'));
                if ($href === '') continue;

                // Make absolute if needed
                if (! parse_url($href, PHP_URL_SCHEME)) {
                    $href = rtrim($this->baseUrl($novelUrl), '/') . '/' . ltrim($href, '/');
                }

                // TODO: read title properly (title attr / inner span / textContent)
                $title = trim($node->getAttribute('title')) ?: trim($node->textContent);

                $num = $this->extractChapterNumber($title, $href);
                if ($num === null) continue;

                $chapters[] = [
                    'title' => $title !== '' ? $title : ("Chapter {$num}"),
                    'url' => $href,
                    'chapter_number' => $num,
                ];
            }
        }

        // uniq by URL + sort by chapter_number
        $uniq = [];
        foreach ($chapters as $c) $uniq[$c['url']] = $c;
        $chapters = array_values($uniq);

        usort($chapters, fn ($a, $b) => $a['chapter_number'] <=> $b['chapter_number']);

        return $chapters;
    }

    public function parseContent(string $chapterUrl): string
    {
        $html  = $this->fetchHtmlWithRetry($chapterUrl);
        $xpath = $this->makeXpath($html);

        // TODO: Replace this selector for your site content container
        // Example: <div id="chapter-content"><p>...</p></div>
        $nodes = $xpath->query("//div[@id='chapter-content']//p[normalize-space()]");

        if (! $nodes || $nodes->length === 0) {
            return '';
        }

        $parts = [];
        foreach ($nodes as $p) {
            $text = trim($p->textContent);
            if ($text !== '') $parts[] = $text;
        }

        return implode("\n\n", $parts);
    }

    private function fetchHtmlWithRetry(string $url): string
    {
        $maxAttempts = 3;

        for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
            $res = Http::withoutVerifying()
                ->timeout(30)
                ->withHeaders([
                    'User-Agent' => self::USER_AGENT,
                    'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language' => 'en-US,en;q=0.9',
                ])
                ->get($url);

            if ($res->successful()) {
                return $res->body();
            }

            // Rate limit (429): exponential backoff + small jitter
            if ($res->status() === 429) {
                $sleep = min(10, 2 ** $attempt) + random_int(0, 2);
                sleep($sleep);
                continue;
            }

            throw new \RuntimeException("Novel HTTP error: {$res->status()}");
        }

        throw new \RuntimeException('Novel fetch failed after retries.');
    }

    private function makeXpath(string $html): DOMXPath
    {
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
        libxml_clear_errors();

        return new DOMXPath($dom);
    }

    private function extractChapterNumber(string $title, string $href): ?int
    {
        // "Chapter 123"
        if (preg_match('/chapter\s*(\d+)/i', $title, $m)) {
            return (int) $m[1];
        }

        // ".../chapter-123" style
        if (preg_match('/chapter-(\d+)/i', $href, $m)) {
            return (int) $m[1];
        }

        // fallback: first number
        if (preg_match('/\b(\d+)\b/', $title, $m)) {
            return (int) $m[1];
        }

        return null;
    }

    private function baseUrl(string $url): string
    {
        $p = parse_url($url);
        $scheme = $p['scheme'] ?? 'https';
        $host   = $p['host'] ?? '';
        return $scheme . '://' . $host;
    }
}
