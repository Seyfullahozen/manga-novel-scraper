<?php

namespace App\Http\Controllers;

use App\Jobs\TranslateNovelChapterJob;
use App\Models\Novel;
use App\Models\NovelChapterTranslation;
use App\Models\ReadingHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Actions\Novel\BuildNovelShowData;
use App\Services\SeriesPopularityService;
use App\Support\AlphabetGrouper;
use App\Actions\Novel\BuildNovelReaderData;

class NovelController extends Controller
{
    public function __construct(
        private AlphabetGrouper $alphabetGrouper,
        private BuildNovelShowData $buildNovelShowData,
        private BuildNovelReaderData $buildNovelReaderData,
        private SeriesPopularityService $seriesPopularityService,
    ) {
    }

    public function home(Request $request)
    {
        $novels = Novel::query()->whereNotNull('scraped_at')->orderByDesc('scraped_at')
            ->with(['latestChapters' => fn($q) => $q->limit(1)])->paginate(24);

        $novelsForAz = Novel::query()->select(['id','title','slug'])->orderBy('title')->get();
        $azGroups = $this->alphabetGrouper->groupByInitial($novelsForAz);
        [$novelpopularByViews, $novelpopularByRating, $novelpopularByFollows] =
            $this->seriesPopularityService->getNovelPopular();

        return view('site.novel.novel-home', [
            'novels'           => $novels,
            'azGroups'         => $azGroups,
            'showAzFilter'     => true,
            'azType'           => 'novel',
            'novelpopularByViews'   => $novelpopularByViews,
            'novelpopularByRating'  => $novelpopularByRating,
            'novelpopularByFollows' => $novelpopularByFollows,
            'popType'          => 'novel',
        ]);
    }

    public function list(Request $request)
    {
        $novels   = Novel::query()->whereNotNull('scraped_at')->orderBy('title')->get();
        $azGroups = $this->alphabetGrouper->groupByInitial($novels);

        return view('site.novel.novel-list', [
            'newNovels'    => $novels,
            'azGroups'     => $azGroups,
            'showAzFilter' => true,
            'azType'       => 'novel',
        ]);
    }

    public function show(Novel $novel)
    {
        $data = $this->buildNovelShowData->handle($novel);

        return view('site.novel.novel-show', $data);
    }

    public function reader(Request $request, Novel $novel, ?int $chapter = null)
    {
        $data = $this->buildNovelReaderData->handle($request, $novel, $chapter);

        return view('site.novel.novel-reader', $data);
    }

}
