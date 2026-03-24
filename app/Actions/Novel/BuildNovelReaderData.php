<?php

namespace App\Actions\Novel;

use App\Jobs\TranslateNovelChapterJob;
use App\Models\ContentReaction;
use App\Models\Novel;
use App\Models\NovelChapter;
use App\Models\NovelChapterTranslation;
use App\Models\ReadingHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Services\ContentInteractionService;

class BuildNovelReaderData
{
    public function __construct(
        private ContentInteractionService $contentInteractionService,
    ) {
    }

    public function handle(Request $request, Novel $novel, ?int $chapter = null): array
    {
        $userId = auth()->id();
        $languages = [
            'en' => 'English',
            'tr-TR' => 'Türkçe',
        ];

        $srcLang = (string) $request->query('src', 'en');
        $tgtLang = (string) $request->query('tgt', 'original');

        if (! array_key_exists($srcLang, $languages)) {
            $srcLang = 'en';
        }

        if ($tgtLang !== 'original' && ! array_key_exists($tgtLang, $languages)) {
            $tgtLang = 'original';
        }

        if ($tgtLang !== 'original' && $tgtLang === $srcLang) {
            $tgtLang = 'original';
        }

        $chapters = $novel->chapters()->get([
            'id',
            'novel_id',
            'chapter_number',
            'title',
            'content',
        ]);

        abort_if($chapters->isEmpty(), 404, 'Bu novel için bölüm yok.');

        $selected = $chapter
            ? $chapters->firstWhere('chapter_number', $chapter)
            : $chapters->first();

        abort_if(! $selected, 404, 'Bölüm bulunamadı.');

        if (auth()->check()) {
            ReadingHistory::recordIfAhead(
                userId: auth()->id(),
                readableType: Novel::class,
                readableId: $novel->id,
                chapterType: NovelChapter::class,
                chapterId: $selected->id,
                chapterNumber: $selected->chapter_number,
            );
        }

        $original = (string) ($selected->content ?? '');
        $readerContent = $original;
        $translationPending = false;

        if ($tgtLang !== 'original' && $original !== '') {
            $existing = NovelChapterTranslation::query()
                ->where('novel_chapter_id', $selected->id)
                ->where('target_lang', $tgtLang)
                ->value('translated_content');

            if (is_string($existing) && $existing !== '') {
                $readerContent = $existing;
            } else {
                $failKey = "novel_chapter_translation_failed:{$selected->id}:{$tgtLang}";

                if (! Cache::has($failKey)) {
                    TranslateNovelChapterJob::dispatch($selected->id, $tgtLang, $srcLang);
                    $translationPending = true;
                }

                $readerContent = $original;
            }
        }

        $tgtOptions = ['original' => 'Original'];

        foreach ($languages as $code => $label) {
            if ($code !== $srcLang) {
                $tgtOptions[$code] = $label;
            }
        }

        $comments = $this->contentInteractionService->commentsFor($selected);
        $contentReactions = $this->contentInteractionService->reactionSummaryFor($novel);
        $userContentReaction = $this->contentInteractionService->userReactionFor($novel, $userId);

        return [
            'novel' => $novel,
            'chapters' => $chapters,
            'selectedChapter' => $selected,
            'languages' => $languages,
            'tgtOptions' => $tgtOptions,
            'srcLang' => $srcLang,
            'tgtLang' => $tgtLang,
            'readerContent' => $readerContent,
            'translationPending' => $translationPending,
            'comments' => $comments,
            'contentReactions' => $contentReactions,
            'userContentReaction' => $userContentReaction,
            'commentableType' => 'novel_chapter',
            'commentableId' => $selected->id,
        ];
    }
}
