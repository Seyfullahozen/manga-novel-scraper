<?php

namespace App\Jobs;

use App\Models\NovelChapter;
use App\Models\NovelChapterTranslation;
use App\Services\Translate\TranslateServices;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class TranslateNovelChapterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 600;
    public int $tries = 2;

    public function __construct(
        public int $novelChapterId,
        public string $targetLang,
        public string $sourceLang = 'en',  // YENİ: kaynak dil parametresi
    ) {}

    public function handle(TranslateServices $translator): void
    {
        $chapter = NovelChapter::find($this->novelChapterId);
        if (! $chapter) return;

        $original = (string) ($chapter->content ?? '');
        if ($original === '') return;

        $exists = NovelChapterTranslation::query()
            ->where('novel_chapter_id', $chapter->id)
            ->where('target_lang', $this->targetLang)
            ->exists();

        if ($exists) return;

        $translated = $translator->translateLongText(
            text: $original,
            src: $this->sourceLang,  // YENİ: sabit 'en' yerine dynamic
            tgt: $this->targetLang,
            chunkSize: 500
        );

        if (! $translated) {
            Log::warning('TRANSLATE_JOB_NULL', [
                'chapter_id' => $chapter->id,
                'src' => $this->sourceLang,
                'tgt' => $this->targetLang,
            ]);

            Cache::put("novel_chapter_translation_failed:{$chapter->id}:{$this->targetLang}", true, now()->addMinutes(10));
            return;
        }

        try {
            NovelChapterTranslation::query()->create([
                'novel_chapter_id' => $chapter->id,
                'target_lang' => $this->targetLang,
                'translated_content' => $translated,
            ]);
        } catch (\Throwable $e) {
            Log::warning('TRANSLATE_JOB_DB_WRITE_FAIL', [
                'chapter_id' => $chapter->id,
                'tgt' => $this->targetLang,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
