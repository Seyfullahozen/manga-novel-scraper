<?php

namespace App\Services;

use App\Models\Manga;
use App\Models\Novel;
use Illuminate\Support\Collection;

class SeriesPopularityService
{
    public function getWeeklyPopular(int $limit = 12): Collection
    {
        $startOfWeek = now()->startOfWeek();

        $weeklyNovels = Novel::query()
            ->whereHas('ratings', fn($q) => $q->where('created_at', '>=', $startOfWeek))
            ->withAvg([
                'ratings as weekly_avg' => fn($q) => $q->where('created_at', '>=', $startOfWeek)
            ], 'rating')
            ->withCount([
                'ratings as weekly_count' => fn($q) => $q->where('created_at', '>=', $startOfWeek)
            ])
            ->having('weekly_count', '>=', 1)
            ->orderByDesc('weekly_avg')
            ->limit($limit)
            ->get()
            ->map(fn($novel) => [
                '_type'        => 'novel',
                '_model'       => $novel,
                'weekly_avg'   => $novel->weekly_avg,
                'weekly_count' => $novel->weekly_count,
            ]);

        $weeklyMangas = Manga::query()
            ->whereHas('ratings', fn($q) => $q->where('created_at', '>=', $startOfWeek))
            ->withAvg([
                'ratings as weekly_avg' => fn($q) => $q->where('created_at', '>=', $startOfWeek)
            ], 'rating')
            ->withCount([
                'ratings as weekly_count' => fn($q) => $q->where('created_at', '>=', $startOfWeek)
            ])
            ->having('weekly_count', '>=', 1)
            ->orderByDesc('weekly_avg')
            ->limit($limit)
            ->get()
            ->map(fn($manga) => [
                '_type'        => 'manga',
                '_model'       => $manga,
                'weekly_avg'   => $manga->weekly_avg,
                'weekly_count' => $manga->weekly_count,
            ]);

        return $weeklyNovels
            ->concat($weeklyMangas)
            ->sortByDesc('weekly_avg')
            ->take($limit)
            ->values();
    }

    public function getNovelPopular(int $limit = 5): array
    {
        $views = Novel::query()
            ->orderByDesc('click_count')
            ->limit($limit)
            ->get();

        $rating = Novel::query()
            ->withAvg('ratings', 'rating')
            ->withCount('ratings')
            ->having('ratings_count', '>=', 1)
            ->orderByDesc('ratings_avg_rating')
            ->limit($limit)
            ->get();

        $follows = Novel::query()
            ->withCount([
                'followedSeries as follows_count' => fn($q) => $q->where('subject_type', Novel::class)
            ])
            ->orderByDesc('follows_count')
            ->limit($limit)
            ->get();

        return [$views, $rating, $follows];
    }

    public function getMangaPopular(int $limit = 5): array
    {
        $views = Manga::query()
            ->orderByDesc('click_count')
            ->limit($limit)
            ->get();

        $rating = Manga::query()
            ->withAvg('ratings', 'rating')
            ->withCount('ratings')
            ->having('ratings_count', '>=', 1)
            ->orderByDesc('ratings_avg_rating')
            ->limit($limit)
            ->get();

        $follows = Manga::query()
            ->withCount([
                'followedSeries as follows_count' => fn($q) => $q->where('subject_type', Manga::class)
            ])
            ->orderByDesc('follows_count')
            ->limit($limit)
            ->get();

        return [$views, $rating, $follows];
    }
}
