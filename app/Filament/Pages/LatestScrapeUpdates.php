<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Illuminate\Support\Collection;
use App\Models\ScrapeRun;
use App\Models\Chapter;
use App\Models\NovelChapter;
use App\Models\Manga;
use App\Models\Novel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class LatestScrapeUpdates extends Page
{
    protected static string|null|\BackedEnum $navigationIcon = 'heroicon-o-bolt';
    protected string $view = 'filament.pages.latest-scrape-updates';

    public function newChapterCards(): Collection
    {
        // ✅ Son schedule batch_id'yi bul
        $batchId = ScrapeRun::query()
            ->where('trigger', 'schedule')
            ->whereNotNull('batch_id')
            ->latest('id')
            ->value('batch_id');

        if (!$batchId) {
            return collect();
        }

        // ✅ SADECE o batch'teki run'ları al
        $runs = ScrapeRun::query()
            ->where('batch_id', $batchId)
            ->where('status', 'done')
            ->whereNotNull('subject_type')
            ->whereNotNull('subject_id')
            ->orderByDesc('finished_at')
            ->get();

        $cards = collect();

        foreach ($runs as $run) {
            $subject = $run->subject;
            if (!$subject) continue;

            $from = $run->started_at ?? now()->subHour();

            if ($subject instanceof Manga) {
                $newChapters = Chapter::query()
                    ->where('manga_id', $subject->id)
                    ->where('created_at', '>=', $from)
                    ->orderByDesc('chapter_number')
                    ->get();

                foreach ($newChapters as $ch) {
                    $site = $this->siteMetaFromUrl($subject->url, 'manga');

                    $cards->push([
                        'type' => 'manga',
                        'run_id' => $run->id,
                        'run_finished_at' => $run->finished_at,
                        'subject_id' => $subject->id,
                        'subject_title' => $subject->title,
                        'chapter_id' => $ch->id,
                        'chapter_number' => $ch->chapter_number,
                        'chapter_title' => $ch->title,
                        'site_logo' => $site['logo'],
                        'site_domain' => $site['domain'],
                        'reader_url' => $this->mangaReaderUrl($subject, $ch),
                    ]);
                }
            }

            if ($subject instanceof Novel) {
                $newChapters = NovelChapter::query()
                    ->where('novel_id', $subject->id)
                    ->where('created_at', '>=', $from)
                    ->orderByDesc('chapter_number')
                    ->get();

                foreach ($newChapters as $ch) {
                    $site = $this->siteMetaFromUrl($subject->url, 'novel');

                    $cards->push([
                        'type' => 'novel',
                        'run_id' => $run->id,
                        'run_finished_at' => $run->finished_at,
                        'subject_id' => $subject->id,
                        'subject_title' => $subject->title,
                        'chapter_id' => $ch->id,
                        'chapter_number' => $ch->chapter_number,
                        'chapter_title' => $ch->title,
                        'site_logo' => $site['logo'],
                        'site_domain' => $site['domain'],
                        'reader_url' => $this->novelReaderUrl($subject, $ch),
                    ]);
                }
            }
        }

        return $cards
            ->unique(fn ($x) => $x['type'].'-'.$x['chapter_id'])
            ->sortByDesc('run_finished_at')
            ->values();
    }

    // ✅ OTOMATİK: Driver'lardan site meta çekimi
    private function siteMetaFromUrl(?string $url, string $type): array
    {
        if (!$url) {
            return ['logo' => null, 'domain' => '-'];
        }

        $host = strtolower(parse_url($url, PHP_URL_HOST) ?? '');

        // ✅ Driver'ları tara
        $drivers = $this->detectDrivers($type);

        foreach ($drivers as $driver) {
            $driverDomain = strtolower($driver['domain'] ?? '');

            if ($host && $driverDomain && str_contains($host, $driverDomain)) {
                return [
                    'logo' => $driver['logo'],
                    'domain' => $driver['domain'],
                ];
            }
        }

        // ✅ Fallback
        return [
            'logo' => null,
            'domain' => $host ?: '-',
        ];
    }

    // ✅ Driver'ları tespit et (SupportedSites.php mantığı)
    private function detectDrivers(string $type): array
    {
        $path = $type === 'manga'
            ? app_path('Services/MangaScraping/Drivers/Local')
            : app_path('Services/NovelScraping/Drivers/Local');

        $namespacePrefix = $type === 'manga'
            ? 'App\\Services\\MangaScraping\\Drivers\\Local\\'
            : 'App\\Services\\NovelScraping\\Drivers\\Local\\';

        if (!File::exists($path)) {
            return [];
        }

        $drivers = [];

        foreach (File::files($path) as $file) {
            $className = $namespacePrefix . $file->getFilenameWithoutExtension();

            if (!class_exists($className)) continue;

            $url = method_exists($className, 'siteUrl')
                ? (string) $className::siteUrl()
                : null;

            $logo = method_exists($className, 'logo')
                ? asset((string) $className::logo())
                : null;

            $domain = $url ? (parse_url($url, PHP_URL_HOST) ?: null) : null;

            if ($domain) {
                $drivers[] = [
                    'domain' => $domain,
                    'logo' => $logo,
                ];
            }
        }

        return $drivers;
    }

    private function mangaReaderUrl(\App\Models\Manga $manga, \App\Models\Chapter $ch): string
    {
        $path = \App\Filament\Pages\MangaReader::getUrl([
            'manga_id' => $manga->id,
            'chapter'  => $ch->chapter_number,
        ]);

        return url($path); // ✅ absolute
    }

    private function novelReaderUrl(\App\Models\Novel $novel, \App\Models\NovelChapter $ch): string
    {
        $path = \App\Filament\Pages\NovelReader::getUrl([
            'novel_id' => $novel->id,
            'chapter'  => $ch->chapter_number,
        ]);

        return url($path); // ✅ absolute
    }

    public static function getNavigationBadge(): ?string
    {
        return Cache::remember('latest_scrape_updates_badge', now()->addSeconds(20), function () {

            $batchId = ScrapeRun::query()
                ->where('trigger', 'schedule')
                ->whereNotNull('batch_id')
                ->latest('id')
                ->value('batch_id');

            if (!$batchId) {
                return null;
            }

            $runs = ScrapeRun::query()
                ->where('batch_id', $batchId)
                ->where('status', 'done')
                ->get(['id', 'subject_type', 'subject_id', 'started_at']);

            if ($runs->isEmpty()) {
                return null;
            }

            $totalNew = 0;

            foreach ($runs as $run) {
                if (!$run->subject_type || !$run->subject_id || !$run->started_at) {
                    continue;
                }

                if ($run->subject_type === Manga::class) {
                    $totalNew += Chapter::query()
                        ->where('manga_id', $run->subject_id)
                        ->where('created_at', '>=', $run->started_at)
                        ->count();
                }

                if ($run->subject_type === Novel::class) {
                    $totalNew += NovelChapter::query()
                        ->where('novel_id', $run->subject_id)
                        ->where('created_at', '>=', $run->started_at)
                        ->count();
                }
            }

            return $totalNew > 0 ? (string) $totalNew : null;
        });
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
