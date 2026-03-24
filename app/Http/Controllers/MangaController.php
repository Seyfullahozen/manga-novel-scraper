<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use App\Models\Chapter;
use App\Models\ReadingHistory;
use Illuminate\Http\Request;
use App\Support\AlphabetGrouper;
use App\Actions\Manga\BuildMangaShowData;
use App\Services\SeriesPopularityService;
use App\Actions\Manga\BuildMangaReaderData;

class MangaController extends Controller
{
    public function __construct(
        private AlphabetGrouper $alphabetGrouper,
        private BuildMangaShowData $buildMangaShowData,
        private BuildMangaReaderData $buildMangaReaderData,
        private SeriesPopularityService $seriesPopularityService,
    ) {
    }

    public function home(Request $request)
    {
        $mangas = Manga::query()->whereNotNull('scraped_at')->orderByDesc('scraped_at')
            ->with(['latestChapters' => fn($q) => $q->limit(1)])->paginate(24);

        $mangasForAz = Manga::query()->select(['id','title','slug'])->orderBy('title')->get();
        $azGroups = $this->alphabetGrouper->groupByInitial($mangasForAz);
        [$mangaPopularByViews, $mangaPopularByRating, $mangaPopularByFollows] =
            $this->seriesPopularityService->getMangaPopular();

        return view('site.manga.manga-home', [
            'mangas'                 => $mangas,
            'azGroups'               => $azGroups,
            'showAzFilter'           => true,
            'azType'                 => 'manga',
            'mangaPopularByViews'    => $mangaPopularByViews,
            'mangaPopularByRating'   => $mangaPopularByRating,
            'mangaPopularByFollows'  => $mangaPopularByFollows,
            'popType'                => 'manga',
        ]);
    }

    public function list(Request $request)
    {
        $mangas   = Manga::query()->orderBy('title')->get();
        $azGroups = $this->alphabetGrouper->groupByInitial($mangas);

        return view('site.manga.manga-list', [
            'newMangas'    => $mangas,
            'azGroups'     => $azGroups,
            'showAzFilter' => true,
            'azType'       => 'manga',
        ]);
    }

    public function show(Manga $manga)
    {
        $data = $this->buildMangaShowData->handle($manga);

        return view('site.manga.manga-show', $data);
    }

    public function reader(Manga $manga, int $chapter)
    {
        $data = $this->buildMangaReaderData->handle($manga, $chapter);

        return view('site.manga.manga-reader', $data);
    }
}
