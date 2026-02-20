<?php

namespace App\Console\Commands;

use App\Models\Manga;
use App\Models\Novel;
use App\Models\Chapter;
use App\Models\NovelChapter;
use App\Models\ScrapeRun;
use App\Filament\Pages\MangaReader;
use App\Filament\Pages\NovelReader;
use App\Events\ScheduleBatchFinishedWithUpdates;
use App\Services\MangaScraping\DriverResolver as MangaDriverResolver;
use App\Services\NovelScraping\DriverResolver as NovelDriverResolver;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class RefreshScrapedContent extends Command
{
    protected $signature = 'scrape:refresh';
    protected $description = 'Previously scraped manga and novels are re-scraped to check for new chapters';

    public function handle(MangaDriverResolver $mangaResolver, NovelDriverResolver $novelResolver): int
    {
        $this->info('Scrape refresh başladı');
        $batchId = (string) Str::ulid();

        Manga::whereNotNull('scraped_at')
            ->select(['id', 'url'])
            ->chunk(50, function ($mangas) use ($mangaResolver, $batchId) {

                foreach ($mangas as $manga) {

                    $run = ScrapeRun::create([
                        'type' => 'manga',
                        'url' => $manga->url,
                        'status' => 'running',
                        'trigger' => 'schedule',
                        'batch_id' => $batchId,
                        'subject_type' => Manga::class,
                        'subject_id' => $manga->id,
                        'started_at' => now(),
                    ]);

                    try {
                        $driver = $mangaResolver->resolve($manga->url);

                        if (! $driver) {
                            $run->update([
                                'status' => 'failed',
                                'finished_at' => now(),
                                'error' => 'Manga driver yok',
                            ]);
                            $this->warn("Manga driver yok: {$manga->url}");
                            continue;
                        }

                        $existingMax = Chapter::where('manga_id', $manga->id)->max('chapter_number') ?? 0;

                        $list = $driver->parseChapters($manga->url);
                        $newOnes = array_values(array_filter(
                            $list,
                            fn ($c) => (int) $c['chapter_number'] > (int) $existingMax
                        ));

                        if (count($newOnes) === 0) {
                            $run->update([
                                'status' => 'done',
                                'finished_at' => now(),
                            ]);
                            $this->line("Manga yeni chapter yok: {$manga->url}");
                            continue;
                        }

                        $this->info("Manga yeni chapter bulundu ({$manga->url}): " . count($newOnes));

                        foreach ($newOnes as $c) {
                            $chapter = Chapter::updateOrCreate(
                                [
                                    'manga_id' => $manga->id,
                                    'chapter_number' => (int) $c['chapter_number'],
                                ],
                                [
                                    'title' => $c['title'],
                                    'url' => $c['url'],
                                    'is_scraped' => false,
                                ]
                            );
                        }

                        $run->update([
                            'status' => 'done',
                            'finished_at' => now(),
                        ]);

                    } catch (\Throwable $e) {
                        $run->update([
                            'status' => 'failed',
                            'finished_at' => now(),
                            'error' => $e->getMessage(),
                        ]);
                        throw $e; // istersen burada throw etme, logla devam et
                    }
                }
            });

        Novel::whereNotNull('scraped_at')
            ->select(['id', 'url'])
            ->chunk(50, function ($novels) use ($novelResolver, $batchId) {

                foreach ($novels as $novel) {

                    $run = ScrapeRun::create([
                        'type' => 'novel',
                        'url' => $novel->url,
                        'status' => 'running',
                        'trigger' => 'schedule',
                        'batch_id' => $batchId,
                        'subject_type' => Novel::class,
                        'subject_id' => $novel->id,
                        'started_at' => now(),
                    ]);

                    try {
                        $driver = $novelResolver->resolve($novel->url);

                        if (! $driver) {
                            $run->update([
                                'status' => 'failed',
                                'finished_at' => now(),
                                'error' => 'Novel driver yok',
                            ]);
                            $this->line("Novel driver yok: {$novel->url}");
                            continue;
                        }

                        $chapters = $driver->parseChapters($novel->url);

                        if (empty($chapters)) {
                            $run->update([
                                'status' => 'done',
                                'finished_at' => now(),
                            ]);
                            $this->line("Novel chapter list boş: {$novel->url}");
                            continue;
                        }

                        $currentMax = NovelChapter::where('novel_id', $novel->id)->max('chapter_number') ?? 0;

                        $new = array_values(array_filter($chapters, fn ($c) =>
                            isset($c['chapter_number']) && (int) $c['chapter_number'] > (int) $currentMax
                        ));

                        if (count($new) === 0) {
                            $run->update([
                                'status' => 'done',
                                'finished_at' => now(),
                            ]);
                            $this->line("Novel yeni chapter yok: {$novel->url}");
                            continue;
                        }

                        $this->line("Novel yeni chapter bulundu ({$novel->url}): " . count($new));

                        foreach ($new as $c) {
                            $chapter = NovelChapter::updateOrCreate(
                                [
                                    'novel_id' => $novel->id,
                                    'chapter_number' => (int) $c['chapter_number'],
                                ],
                                [
                                    'title' => $c['title'] ?? ('Chapter ' . (int) $c['chapter_number']),
                                    'url' => $c['url'],
                                    'is_scraped' => false,
                                ]
                            );
                        }

                        $run->update([
                            'status' => 'done',
                            'finished_at' => now(),
                        ]);

                    } catch (\Throwable $e) {
                        $run->update([
                            'status' => 'failed',
                            'finished_at' => now(),
                            'error' => $e->getMessage(),
                        ]);
                        throw $e;
                    }
                }
            });

        Cache::forget('latest_scrape_updates_badge');
        $updates = [];

        $runs = ScrapeRun::query()
            ->where('trigger', 'schedule')
            ->where('batch_id', $batchId)
            ->where('status', 'done')
            ->whereNotNull('subject_type')
            ->whereNotNull('subject_id')
            ->get(['id','subject_type','subject_id','started_at','finished_at']);

        foreach ($runs as $run) {
            if (! $run->started_at) continue;

            if ($run->subject_type === Manga::class) {
                $manga = Manga::find($run->subject_id);
                if (! $manga) continue;

                $new = Chapter::query()
                    ->where('manga_id', $manga->id)
                    ->where('created_at', '>=', $run->started_at)
                    ->orderBy('chapter_number')
                    ->get();

                foreach ($new as $ch) {
                    $updates[] = [
                        'type' => 'manga',
                        'subject_type' => Manga::class,
                        'subject_id' => $manga->id,
                        'subject_title' => $manga->title,
                        'chapter_number' => $ch->chapter_number,
                        'chapter_title' => $ch->title ?? ('Bölüm '.$ch->chapter_number),
                        'reader_url' => MangaReader::getUrl([
                            'manga_id' => $manga->id,
                            'chapter' => $ch->chapter_number,
                        ]),
                    ];
                }
            }

            if ($run->subject_type === Novel::class) {
                $novel = Novel::find($run->subject_id);
                if (! $novel) continue;

                $new = NovelChapter::query()
                    ->where('novel_id', $novel->id)
                    ->where('created_at', '>=', $run->started_at)
                    ->orderBy('chapter_number')
                    ->get();

                foreach ($new as $ch) {
                    $updates[] = [
                        'type' => 'novel',
                        'subject_type' => Novel::class,
                        'subject_id' => $novel->id,
                        'subject_title' => $novel->title,
                        'chapter_number' => $ch->chapter_number,
                        'chapter_title' => $ch->title ?? ('Chapter '.$ch->chapter_number),
                        'reader_url' => NovelReader::getUrl([
                            'novel_id' => $novel->id,
                            'chapter' => $ch->chapter_number,
                        ]),
                    ];
                }
            }
        }

        if (! empty($updates)) {
            event(new ScheduleBatchFinishedWithUpdates($batchId, $updates));
        }
        $this->info('Scrape refresh tamamlandı');
        return Command::SUCCESS;
    }

}
