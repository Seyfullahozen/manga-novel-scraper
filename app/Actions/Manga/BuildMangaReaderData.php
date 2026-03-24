<?php

namespace App\Actions\Manga;

use App\Models\Chapter;
use App\Models\Manga;
use App\Models\ReadingHistory;
use App\Services\ContentInteractionService;

class BuildMangaReaderData
{
    public function __construct(
        private ContentInteractionService $contentInteractionService,
    ) {
    }

    public function handle(Manga $manga, int $chapter): array
    {
        $userId = auth()->id();
        $selected = Chapter::query()
            ->where('manga_id', $manga->id)
            ->where('chapter_number', $chapter)
            ->firstOrFail();

        $manga->increment('click_count');

        if (auth()->check()) {
            ReadingHistory::record(
                userId: auth()->id(),
                readableType: Manga::class,
                readableId: $manga->id,
                chapterType: Chapter::class,
                chapterId: $selected->id,
                chapterNumber: $selected->chapter_number,
            );
        }

        $prev = Chapter::query()
            ->where('manga_id', $manga->id)
            ->where('chapter_number', '<', $chapter)
            ->orderByDesc('chapter_number')
            ->first();

        $next = Chapter::query()
            ->where('manga_id', $manga->id)
            ->where('chapter_number', '>', $chapter)
            ->orderBy('chapter_number')
            ->first();

        $images = $selected->getMedia('chapter-images')
            ->sortBy(fn ($m) => $m->getCustomProperty('order'))
            ->values();

        $comments = $this->contentInteractionService->commentsFor($selected);
        $contentReactions = $this->contentInteractionService->reactionSummaryFor($manga);
        $userContentReaction = $this->contentInteractionService->userReactionFor($manga, $userId);

        return [
            'manga' => $manga,
            'selected' => $selected,
            'prev' => $prev,
            'next' => $next,
            'images' => $images,
            'comments' => $comments,
            'contentReactions' => $contentReactions,
            'userContentReaction' => $userContentReaction,
            'commentableType' => 'chapter',
            'commentableId' => $selected->id,
        ];
    }
}
