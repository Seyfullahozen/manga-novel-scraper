<?php

namespace App\Actions\Novel;

use App\Models\ContentReaction;
use App\Models\FollowedSeries;
use App\Models\Novel;
use App\Models\NovelRating;
use App\Models\ReadingHistory;
use App\Services\ContentInteractionService;

class BuildNovelShowData
{
    public function __construct(
        private ContentInteractionService $contentInteractionService,
    ) {
    }

    public function handle(Novel $novel): array
    {
        $chapters = $novel->chapters()->get([
            'id',
            'chapter_number',
            'title',
            'created_at',
        ]);

        abort_if($chapters->isEmpty(), 404, 'Bu novel için bölüm yok.');

        $userId = auth()->id();

        $isFollowing = false;
        $userRating = null;
        $readingProgress = null;
        $userContentReaction = null;

        if ($userId) {
            $isFollowing = FollowedSeries::query()
                ->where('user_id', $userId)
                ->where('subject_type', Novel::class)
                ->where('subject_id', $novel->id)
                ->exists();

            $userRating = NovelRating::query()
                ->where('user_id', $userId)
                ->where('novel_id', $novel->id)
                ->value('rating');

            $readingProgress = ReadingHistory::progressFor($userId, Novel::class, $novel->id);

            $userContentReaction = $this->contentInteractionService->userReactionFor($novel, $userId);
        }

        $ratingAvg = NovelRating::query()
            ->where('novel_id', $novel->id)
            ->avg('rating');

        $ratingCount = NovelRating::query()
            ->where('novel_id', $novel->id)
            ->count();

        $comments = $this->contentInteractionService->commentsFor($novel);
        $contentReactions = $this->contentInteractionService->reactionSummaryFor($novel);

        return [
            'novel'               => $novel,
            'chapters'            => $chapters,
            'isFollowing'         => $isFollowing,
            'userRating'          => $userRating,
            'ratingAvg'           => $ratingAvg,
            'ratingCount'         => $ratingCount,
            'comments'            => $comments,
            'contentReactions'    => $contentReactions,
            'userContentReaction' => $userContentReaction,
            'readingProgress'     => $readingProgress,
            'commentableType'     => 'novel',
            'commentableId'       => $novel->id,
        ];
    }
}
