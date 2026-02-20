<?php

namespace App\Actions\Novel;

use App\Models\Novel;
use App\Models\NovelChapter;
use Psr\Log\LoggerInterface;
use App\Models\ScrapeRun;
use Illuminate\Support\Facades\DB;
use App\Models\ScrapeRunEvent;
use App\Services\NovelScraping\DriverResolver;

class ScrapeNovelFromUrl
{
    public function __construct(
        private readonly DriverResolver $resolver,
        private readonly LoggerInterface $log,
    ) {}

    public function execute(string $url, ?int $runId = null): Novel
    {
        $url = preg_replace('/#.*$/', '', $url); // ✅ fragment temizle

        $this->runEvent($runId, 'info', '1 Novel sayfasına erişiliyor…', ['url' => $url]);
        $driver = $this->resolver->resolve($url);

        if (!$driver) {
            $this->runEvent($runId, 'error', 'Bu site desteklenmiyor.');
            return Novel::createFromUrl($url);
        }

        $this->runEvent($runId, 'info', '2 Novel kaydı hazırlanıyor…');

        $novel = Novel::createFromUrl($url);

        // ✅ RUN -> SUBJECT bağla
        if ($runId) {
            ScrapeRun::whereKey($runId)->update([
                'subject_type' => Novel::class,
                'subject_id'   => $novel->id,
            ]);
        }

        $this->runEvent($runId, 'success', '3 Novel kaydı hazır.', [
            'novel_id' => $novel->id,
            'title' => $novel->title,
        ]);

        $this->runEvent($runId, 'info', '4 Bölüm listesi alınıyor…');
        $chapterLinks = $driver->parseChapters($url);
        $this->runEvent($runId, 'success', '5 Bölüm listesi alındı ve inceleniyor.', ['count' => count($chapterLinks)]);

        foreach ($chapterLinks as $chapterData) {
            $chapter = NovelChapter::updateOrCreate(
                [
                    'novel_id' => $novel->id,
                    'chapter_number' => $chapterData['chapter_number'],
                ],
                [
                    'title' => $chapterData['title'],
                    'url' => $chapterData['url'],
                    'is_scraped' => false,
                ]
            );
            usleep(random_int(800000, 1400000)); // 0.8 - 1.4 sn
            $content = $driver->parseContent($chapter->url);
            $chapter->update([
                'content' => $content,
                'is_scraped' => $content !== '',
            ]);
        }
        $novel->update(['scraped_at' => now()]);
        $this->runEvent($runId, 'success', '6 Scrape tamamlandı ✅', ['novel_id' => $novel->id]);
        return $novel->fresh();
    }

    private function runEvent(?int $runId, string $level, string $message, array $context = []): void
    {
        if (! $runId) return;

        ScrapeRunEvent::create([
            'scrape_run_id' => $runId,
            'level' => $level,
            'message' => $message,
            'context' => $context,
        ]);
    }
}
