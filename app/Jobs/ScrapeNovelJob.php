<?php

namespace App\Jobs;

use App\Models\ScrapeRunEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Actions\Novel\ScrapeNovelFromUrl;
use App\Models\ScrapeRun;

class ScrapeNovelJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $url,
        public ?int $runId = null,
    ) {}

    public function handle(ScrapeNovelFromUrl $scraper): void
    {
        \Log::info('SCRAPE_NOVEL_JOB', ['runId' => $this->runId, 'url' => $this->url]);
        if ($this->runId) {
            ScrapeRun::whereKey($this->runId)->update([
                'status' => 'running',
                'started_at' => now(),
            ]);
        }

        try {
            $scraper->execute($this->url, $this->runId);

            if ($this->runId) {
                ScrapeRun::whereKey($this->runId)->update([
                    'status' => 'done',
                    'finished_at' => now(),
                ]);
            }
        } catch (\Throwable $e) {
            if ($this->runId) {
                ScrapeRun::whereKey($this->runId)->update([
                    'status' => 'failed',
                    'finished_at' => now(),
                    'error' => $e->getMessage(),
                ]);

                // kullanıcıya anlaşılır hata event’i:
                ScrapeRunEvent::create([
                    'scrape_run_id' => $this->runId,
                    'level' => 'error',
                    'message' => 'Scrape sırasında hata oluştu.',
                    'context' => ['error' => $e->getMessage()],
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
