<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\Manga;
use Illuminate\Http\Request;
use App\Support\AlphabetGrouper;
use App\Services\SeriesPopularityService;

class SiteController extends Controller
{
    public function __construct(
        private SeriesPopularityService $seriesPopularityService,
        private AlphabetGrouper $alphabetGrouper,
    ) {
    }
    private function sharedViewData(Request $request): array
    {
        return [
            'inlineBodyStyle' => null,
            'siteName'        => config('app.name', 'SiteAdı'),
            'searchQuery'     => (string) $request->query('q', ''),
        ];
    }

    private function render(Request $request, string $view, array $data = [])
    {
        return view($view, $data + $this->sharedViewData($request));
    }

    public function index(Request $request)
    {
        // Son eklenenler — karışık
        $newNovels = Novel::query()->whereNotNull('scraped_at')->orderByDesc('scraped_at')
            ->with(['latestChapters' => fn($q) => $q->limit(1)])->limit(10)->get()
            ->map(fn($n) => array_merge($n->toArray(), ['_type' => 'novel', '_model' => $n]));

        $newMangas = Manga::query()->whereNotNull('scraped_at')->orderByDesc('scraped_at')
            ->with(['latestChapters' => fn($q) => $q->limit(1)])->limit(10)->get()
            ->map(fn($m) => array_merge($m->toArray(), ['_type' => 'manga', '_model' => $m]));

        $combined = $newNovels->concat($newMangas)->sortByDesc('scraped_at')->take(20)->values();

        $weeklyPopular = $this->seriesPopularityService->getWeeklyPopular();

        [$novelpopularByViews, $novelpopularByRating, $novelpopularByFollows] =
            $this->seriesPopularityService->getNovelPopular();

        [$mangaPopularByViews, $mangaPopularByRating, $mangaPopularByFollows] =
            $this->seriesPopularityService->getMangaPopular();

        // Az-filter — karışık
        $novelsForAz = Novel::query()->select(['id','title','slug'])->orderBy('title')->get();
        $mangasForAz = Manga::query()->select(['id','title','slug'])->orderBy('title')->get();
        $azGroups = $this->alphabetGrouper->groupMixedByInitial($novelsForAz, $mangasForAz);

        return $this->render($request, 'site.index', [
            'combined'               => $combined,
            'weeklyPopular'          => $weeklyPopular,
            'novelpopularByViews'    => $novelpopularByViews,
            'novelpopularByRating'   => $novelpopularByRating,
            'novelpopularByFollows'  => $novelpopularByFollows,
            'mangaPopularByViews'    => $mangaPopularByViews,
            'mangaPopularByRating'   => $mangaPopularByRating,
            'mangaPopularByFollows'  => $mangaPopularByFollows,
            'showAzFilter'           => true,
            'azGroups'               => $azGroups,
            'azType'                 => 'mixed',
            'popType'                => 'mixed',
        ]);
    }
}
