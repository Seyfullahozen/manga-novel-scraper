<?php

namespace App\Observers;

use App\Models\NovelChapter;
use App\Jobs\ScrapeNovelChapterContentJob;
use Illuminate\Support\Facades\Log;

class NovelChapterObserver
{
    public bool $afterCommit = true;

    public function created(NovelChapter $chapter): void
    {
        if ($chapter->is_scraped) {
            return;
        }

        Log::info('OBSERVER: NovelChapter created -> dispatch content job', [
            'chapter_id' => $chapter->id,
            'novel_id' => $chapter->novel_id,
            'chapter_number' => $chapter->chapter_number,
        ]);

        ScrapeNovelChapterContentJob::dispatch($chapter->id)->onQueue('default');
    }
}
