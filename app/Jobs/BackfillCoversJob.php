<?php

namespace App\Jobs;

use App\Models\Manga;
use App\Models\Novel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class BackfillCoversJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 600;
    public int $tries   = 1;

    public function __construct(
        public readonly string $type = 'all' // 'manga' | 'novel' | 'all'
    ) {}

    public function handle(): void
    {
        if ($this->type === 'manga' || $this->type === 'all') {
            $this->backfillMangas();
        }

        if ($this->type === 'novel' || $this->type === 'all') {
            $this->backfillNovels();
        }
    }

    private function backfillMangas(): void
    {
        Manga::whereNotNull('cover_url')
            ->whereDoesntHave('media', fn($q) => $q->where('collection_name', 'cover'))
            ->chunkById(50, function ($mangas) {
                foreach ($mangas as $manga) {
                    try {
                        $manga->addMediaFromUrl($manga->cover_url)
                            ->usingFileName(Str::slug($manga->title) . '.webp')
                            ->toMediaCollection('cover');

                        Log::info("Manga cover backfilled: {$manga->id} — {$manga->title}");
                    } catch (\Exception $e) {
                        Log::warning("Manga cover backfill failed: {$manga->id}", ['error' => $e->getMessage()]);
                    }

                    // Rate limiting — kaynak siteyi yormayalım
                    usleep(300000); // 0.3 sn
                }
            });
    }

    private function backfillNovels(): void
    {
        Novel::whereNotNull('cover_url')
            ->whereDoesntHave('media', fn($q) => $q->where('collection_name', 'cover'))
            ->chunkById(50, function ($novels) {
                foreach ($novels as $novel) {
                    try {
                        $novel->addMediaFromUrl($novel->cover_url)
                            ->usingFileName(Str::slug($novel->title) . '.webp')
                            ->toMediaCollection('cover');

                        Log::info("Novel cover backfilled: {$novel->id} — {$novel->title}");
                    } catch (\Exception $e) {
                        Log::warning("Novel cover backfill failed: {$novel->id}", ['error' => $e->getMessage()]);
                    }

                    usleep(300000);
                }
            });
    }
}
