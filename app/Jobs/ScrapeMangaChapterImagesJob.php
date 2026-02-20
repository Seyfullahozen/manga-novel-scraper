<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Manga;
use App\Models\Chapter;
use App\Models\ChapterImage;
use App\Services\MangaScraping\DriverResolver;

class ScrapeMangaChapterImagesJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $uniqueFor = 3600; // 1 saat (istersen 300 yap)

    public function __construct(public int $chapterId) {}

    public int $tries = 10;
    public int $timeout = 120;
    public array $backoff = [30, 60, 120, 240, 480, 900];

    public function uniqueId(): string
    {
        return 'manga-chapter-images:' . $this->chapterId;
    }

    public function handle(DriverResolver $resolver): void
    {
        $chapter = Chapter::with('manga')->find($this->chapterId);
        if (! $chapter || ! $chapter->manga?->url) {
            return;
        }

        $driver = $resolver->resolve($chapter->manga->url);
        if (! $driver) {
            return;
        }

        try {
            $images = $driver->parseImages($chapter->url);
        } catch (\Throwable $e) {

            if ($this->isRateLimited($e)) {
                $delay = $this->nextBackoffSeconds();

                \Log::warning('RATE_LIMIT: Manga images job released', [
                    'chapter_id' => $this->chapterId,
                    'delay' => $delay,
                    'attempt' => $this->attempts(),
                    'error' => $e->getMessage(),
                ]);

                $this->release($delay);
                return;
            }

            throw $e;
        }

        foreach ($images as $image) {
            ChapterImage::updateOrCreate(
                [
                    'chapter_id' => $chapter->id,
                    'order' => $image['order'],
                ],
                [
                    'title' => $image['alt'] ?? null,
                    'url' => $image['url'],
                ]
            );
        }
        $chapter = Chapter::with('manga')->findOrFail($this->chapterId);
        $chapter->update(['is_scraped' => true]);
        // ✅ parent manga scraped_at güncelle
        Manga::whereKey($chapter->manga_id)->update(['scraped_at' => now()]);
    }

    private function isRateLimited(\Throwable $e): bool
    {
        return str_contains($e->getMessage(), '429');
    }

    private function nextBackoffSeconds(): int
    {
        $attempt = max(1, (int) $this->attempts());
        $index = min($attempt - 1, count($this->backoff) - 1);
        return (int) $this->backoff[$index];
    }
}
