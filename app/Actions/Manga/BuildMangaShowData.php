<?php

namespace App\Actions\Manga;

use App\Models\ContentReaction;
use App\Models\FollowedSeries;
use App\Models\Manga;
use App\Models\MangaRating;
use App\Models\ReadingHistory;
use App\Services\ContentInteractionService;

class BuildMangaShowData
{
    public function __construct(
        private ContentInteractionService $contentInteractionService,
    ) {
    }

    public function handle(Manga $manga): array
    {
        $chapters = $manga->chapters()->get([
            'id',
            'chapter_number',
            'title',
            'created_at',
        ]);

        abort_if($chapters->isEmpty(), 404, 'Bu manga için bölüm yok.');

        $userId = auth()->id();

        $isFollowing = false;
        $userRating = null;
        $readingProgress = null;
        $userContentReaction = null;

        if ($userId) {
            $isFollowing = FollowedSeries::query()
                ->where('user_id', $userId)
                ->where('subject_type', Manga::class)
                ->where('subject_id', $manga->id)
                ->exists();

            $userRating = MangaRating::query()
                ->where('user_id', $userId)
                ->where('manga_id', $manga->id)
                ->value('rating');

            $readingProgress = ReadingHistory::progressFor($userId, Manga::class, $manga->id);

            $userContentReaction = $this->contentInteractionService->userReactionFor($manga, $userId);
        }

        $ratingAvg = MangaRating::query()
            ->where('manga_id', $manga->id)
            ->avg('rating');

        $ratingCount = MangaRating::query()
            ->where('manga_id', $manga->id)
            ->count();

        $comments = $this->contentInteractionService->commentsFor($manga);
        $contentReactions = $this->contentInteractionService->reactionSummaryFor($manga);

        return [
            'manga'               => $manga,
            'chapters'            => $chapters,
            'isFollowing'         => $isFollowing,
            'userRating'          => $userRating,
            'ratingAvg'           => $ratingAvg,
            'ratingCount'         => $ratingCount,
            'comments'            => $comments,
            'contentReactions'    => $contentReactions,
            'userContentReaction' => $userContentReaction,
            'readingProgress'     => $readingProgress,
            'commentableType'     => 'manga',
            'commentableId'       => $manga->id,
        ];
    }
}
