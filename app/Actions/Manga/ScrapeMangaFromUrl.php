<?php

namespace App\Actions\Manga;

use App\Models\Manga;
use App\Models\Chapter;
use App\Models\ChapterImage;
use App\Models\ScrapeRun;
use App\Models\ScrapeRunEvent;
use Psr\Log\LoggerInterface;
use Illuminate\Support\Facades\DB;
use App\Services\MangaScraping\DriverResolver;

class ScrapeMangaFromUrl
{

    public function __construct(
        private readonly DriverResolver  $resolver,
        private readonly LoggerInterface $log,
    ){}

    public function execute(string $url, ?int $runId = null): Manga
    {
        $url = preg_replace('/#.*$/', '', $url); // ✅ fragment temizle

        $this->runEvent($runId, 'info', '1 Manga sayfasına erişiliyor…', ['url' => $url]);
        $driver = $this->resolver->resolve($url);

        if (!$driver) {
            $this->runEvent($runId, 'error', 'Bu site desteklenmiyor.');
            return Manga::createFromUrl($url);
        }

        $this->runEvent($runId, 'info', '2 Manga kaydı hazırlanıyor…');

        $manga = Manga::createFromUrl($url);

        // ✅ RUN -> SUBJECT bağla
        if ($runId) {
            ScrapeRun::whereKey($runId)->update([
                'subject_type' => Manga::class,
                'subject_id'   => $manga->id,
            ]);
        }

        $this->runEvent($runId, 'success', '3 Manga kaydı hazır.', [
            'manga_id' => $manga->id,
            'title' => $manga->title,
        ]);

        $this->runEvent($runId, 'info', '4 Bölüm listesi alınıyor…');
        $chapterLinks = $driver->parseChapters($url);
        $this->runEvent($runId, 'success', '5 Bölüm listesi alındı ve inceleniyor.', ['count' => count($chapterLinks)]);

        foreach ($chapterLinks as $chapterData) {
            $chapter = Chapter::updateOrCreate(
                [
                    'manga_id' => $manga->id,
                    'chapter_number' => $chapterData['chapter_number'],
                ],
                [
                    'title' => $chapterData['title'],
                    'url' => $chapterData['url'],
                    'is_scraped' => false,
                ]
            );
            $images = $driver->parseImages($chapter->url);
            foreach ($images as $image) {

                ChapterImage::updateOrCreate(
                    [
                        'chapter_id' => $chapter->id,
                        'order' => $image['order'],
                    ],
                    [
                        'title' => $image['alt'],
                        'url' => $image['url'],
                    ]
                );
            }
            $chapter->update(['is_scraped' => true]);
        }
        $manga->update(['scraped_at' => now()]);
        $this->runEvent($runId, 'success', '6 Scrape tamamlandı ✅', ['manga_id' => $manga->id]);
        return $manga->fresh();
    }

    private function runEvent(?int $runId, string $level, string $message, array $context = []): void
    {
        if (!$runId) return;

        ScrapeRunEvent::create([
            'scrape_run_id' => $runId,
            'level' => $level,
            'message' => $message,
            'context' => $context,
        ]);
    }
}
