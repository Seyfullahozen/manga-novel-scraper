<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Actions\Manga\ScrapeMangaFromUrl;
use App\Models\ScrapeRun;
use App\Models\ScrapeRunEvent;

class ScrapeMangaJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $url,
        public ?int $runId = null,
    ) {}

    public function handle(ScrapeMangaFromUrl $scraper): void
    {
        if ($this->runId) {
            ScrapeRun::whereKey($this->runId)->update([
                'status' => 'running',
                'started_at' => now(),
            ]);

            $this->event('info', 'Scraping başladı...');
        }

        try {
            $scraper->execute($this->url, $this->runId);

            if ($this->runId) {
                $this->event('success', 'Scraping tamamlandı!');

                ScrapeRun::whereKey($this->runId)->update([
                    'status' => 'done',
                    'finished_at' => now(),
                ]);
            }
        } catch (\Throwable $e) {
            if ($this->runId) {
                $this->event('error', 'Hata: ' . $e->getMessage());

                ScrapeRun::whereKey($this->runId)->update([
                    'status' => 'failed',
                    'finished_at' => now(),
                    'error' => $e->getMessage(),
                ]);
            }
            throw $e;
        }
    }

    private function event(string $level, string $message, array $context = []): void
    {
        if (! $this->runId) return;

        ScrapeRunEvent::create([
            'scrape_run_id' => $this->runId,
            'level' => $level,
            'message' => $message,
            'context' => $context,
        ]);
    }
}
