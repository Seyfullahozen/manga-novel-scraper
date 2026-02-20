<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Novel;
use App\Models\NovelChapter;
use App\Services\NovelScraping\DriverResolver;

class ScrapeNovelChapterContentJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $uniqueFor = 3600;

    public function __construct(public int $chapterId){}

    public int $tries = 10;

    public int $timeout = 120;

    // deneme aralıkları (saniye)
    public array $backoff = [30, 60, 120, 240, 480, 900];

    public function uniqueId(): string
    {
        return 'novel-chapter-content:' . $this->chapterId;
    }

    public function handle(DriverResolver $resolver): void
    {
        $chapter = NovelChapter::with('novel')->find($this->chapterId);
        if (!$chapter || !$chapter->novel?->url) return;

        $driver = $resolver->resolve($chapter->novel->url);
        if (! $driver) return;

        try {
            $content = $driver->parseContent($chapter->url);
        } catch (\Throwable $e) {

            // 429 / rate limit yakala (senin log'unda RuntimeException "Novelbin HTTP hata: 429" vardı)
            if ($this->isRateLimited($e)) {
                $delay = $this->nextBackoffSeconds();

                \Log::warning('RATE_LIMIT: Novel content job released', [
                    'chapter_id' => $this->chapterId,
                    'delay' => $delay,
                    'attempt' => $this->attempts(),
                    'error' => $e->getMessage(),
                ]);

                $this->release($delay);
                return;
            }

            // başka hata ise gerçekten fail olsun
            throw $e;
        }

        $chapter = NovelChapter::findOrFail($this->chapterId);
        $chapter->update([
            'content' => $content,
            'is_scraped' => $content !== '',
        ]);
        Novel::whereKey($chapter->novel_id)->update(['scraped_at' => now()]);
    }

    private function isRateLimited(\Throwable $e): bool
    {
        $msg = $e->getMessage();

        // En garanti: senin fırlattığın RuntimeException mesajında "429" geçiyor
        if (str_contains($msg, '429')) return true;

        return false;
    }

    private function nextBackoffSeconds(): int
    {
        $attempt = max(1, (int) $this->attempts()); // 1,2,3...
        $index = min($attempt - 1, count($this->backoff) - 1);

        return (int) $this->backoff[$index];
    }
}
