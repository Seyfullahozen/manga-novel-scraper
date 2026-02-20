<?php

namespace App\Observers;

use App\Models\Chapter;
use App\Jobs\ScrapeMangaChapterImagesJob;
use Illuminate\Support\Facades\Log;

class ChapterObserver
{
    // transaction varsa commit sonrası çalışsın (daha güvenli)
    public bool $afterCommit = true;

    public function created(Chapter $chapter): void
    {
        // zaten scraped ise hiç uğraşma
        if ($chapter->is_scraped) {
            return;
        }

        if (blank($chapter->url)) return;

        Log::info('OBSERVER: Chapter created -> dispatch images job', [
            'chapter_id' => $chapter->id,
            'manga_id' => $chapter->manga_id,
            'chapter_number' => $chapter->chapter_number,
        ]);

        ScrapeMangaChapterImagesJob::dispatch($chapter->id)->onQueue('default');
    }
}
