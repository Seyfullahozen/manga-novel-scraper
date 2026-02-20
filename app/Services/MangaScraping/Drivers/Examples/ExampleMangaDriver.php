<?php

namespace App\Services\MangaScraping\Drivers\Examples;

use App\Contracts\MangaSiteDriver;
use DOMDocument;
use DOMXPath;
use Illuminate\Support\Facades\Http;

/**
 * ExampleMangaDriver (TEMPLATE)
 *
 * Copy this file into:
 *   app/Services/MangaScraping/Drivers/Local/<YourSite>Driver.php
 *
 * Then fill the TODO sections:
 * - supports(): site domain match
 * - parseChapters(): chapter list xpath/selector
 * - parseImages(): chapter images extraction (DOM or embedded JSON)
 */
class ExampleMangaDriver implements MangaSiteDriver
{
    private const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    /** Change to your site */
    public static function siteUrl(): string { return 'https://example-manga-site.com/'; }

    /** Put a logo path if you want (public assets), else return empty string */
    public static function logo(): string { return ''; } // e.g. 'images/sites/example.png'

    public function supports(string $url): bool
    {
        $host = parse_url($url, PHP_URL_HOST) ?? '';
        $host = strtolower($host);

        // TODO: change domain check
        return str_contains($host, 'example-manga-site.com');
    }

    /**
     * Must return:
     * [
     *   ['title' => 'Chapter 12', 'url' => 'https://...', 'chapter_number' => 12],
     *   ...
     * ]
     */
    public function parseChapters(string $mangaUrl): array
    {
        $html  = $this->fetchHtml($mangaUrl);
        $xpath = $this->makeXpath($html);

        // TODO: Replace xpath query for your site
        // Example: <div id="chapterlist"><a href="..."><span class="chapternum">Chapter 12</span></a>
        $nodes = $xpath->query('//div[@id="chapterlist"]//a');

        $chapters = [];

        if ($nodes) {
            foreach ($nodes as $node) {
                $href = trim($node->getAttribute('href'));
                if ($href === '') continue;

                // TODO: Replace how you read the title text
                $title = trim($node->textContent);
                if ($title === '') continue;

                $chapterNumber = $this->extractChapterNumber($title);
                if ($chapterNumber === null) continue;

                $chapters[] = [
                    'title' => $title,
                    'url' => $href,
                    'chapter_number' => $chapterNumber,
                ];
            }
        }

        return $chapters;
    }

    /**
     * Must return:
     * [
     *   ['order' => 1, 'url' => 'https://img...', 'alt' => '...'],
     *   ...
     * ]
     */
    public function parseImages(string $chapterUrl): array
    {
        $html = $this->fetchHtml($chapterUrl, true);

        /**
         * There are 2 common approaches:
         * A) Images exist in DOM: <img src="...">
         * B) Images are embedded in a JS JSON blob
         */

        // --- A) DOM example (recommended as default template) ---
        $xpath = $this->makeXpath($html);

        // TODO: Replace image selector xpath for your site
        $imgNodes = $xpath->query('//img[@src]');

        $images = [];
        $order = 0;

        if ($imgNodes) {
            foreach ($imgNodes as $img) {
                $src = trim($img->getAttribute('src'));
                if ($src === '') continue;

                $images[] = [
                    'order' => ++$order,
                    'url' => $src,
                    'alt' => trim($img->getAttribute('alt')) ?: "Chapter Image {$order}",
                ];
            }
        }

        return $images;

        // --- B) JSON-in-JS example (if your site uses it) ---
        // if (preg_match('/some_reader\.run\((\{.*?\})\);/s', $html, $m)) {
        //     $json = stripcslashes($m[1]);
        //     $data = json_decode($json, true);
        //     // TODO: map $data to $images
        // }
    }

    private function fetchHtml(string $url, bool $withUserAgent = false): string
    {
        $request = Http::withoutVerifying()->timeout(30);

        if ($withUserAgent) {
            $request = $request->withHeaders([
                'User-Agent' => self::USER_AGENT,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language' => 'en-US,en;q=0.9',
            ]);
        }

        return $request->get($url)->body();
    }

    private function makeXpath(string $html): DOMXPath
    {
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
        libxml_clear_errors();

        return new DOMXPath($dom);
    }

    private function extractChapterNumber(string $title): ?int
    {
        // Supports: "Bölüm 146" / "Bolum 146" / "Chapter 146"
        if (preg_match('/(bölüm|bolum|chapter)\s*(\d+)/iu', $title, $m)) {
            return (int) $m[2];
        }

        // fallback: first number
        if (preg_match('/\b(\d+)\b/', $title, $m)) {
            return (int) $m[1];
        }

        return null;
    }
}
