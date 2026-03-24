<?php

namespace App\Filament\Pages;

use UnitEnum;
use BackedEnum;
use Filament\Pages\Page;
use App\Models\Novel;
use App\Models\NovelChapter;
use App\Models\NovelChapterTranslation;
use App\Services\Translate\TranslateServices;
use Illuminate\Support\Facades\Cache;

class NovelReader extends Page
{
    protected static string|null|BackedEnum $navigationIcon = 'heroicon-o-book-open';
    protected string $view = 'filament.pages.novel-reader';
    protected static ?string $navigationLabel = 'Novel Reader';
    protected static ?string $title = 'Novel Reader';

    protected static string | UnitEnum | null $navigationGroup = 'Reader';

    public ?int $novelId = null;
    public ?int $chapterNumber = null;

    public string $srcLang = 'en';       // kaynak dil
    public string $tgtLang = 'original'; // hedef dil (original = çeviri yok)

    public string $search = '';
    public bool $translationPending = false;

    // Desteklenen diller
    public array $languages = [
        'en'    => 'English',
        'tr-TR' => 'Türkçe',
    ];

    public function mount(): void
    {
        $this->novelId      = request()->query('novel_id') ? (int) request()->query('novel_id') : null;
        $this->chapterNumber = request()->query('chapter') ? (int) request()->query('chapter') : null;
        $this->srcLang      = request()->query('src', 'en');
        $this->tgtLang      = request()->query('tgt', 'original');

        if ($this->novelId && $this->chapterNumber === null) {
            $this->chapterNumber = $this->minChapter;
        }
    }

    public function getNovelsProperty()
    {
        return Novel::query()
            ->when($this->search !== '', fn ($q) => $q->where('title', 'like', "%{$this->search}%"))
            ->orderBy('title')
            ->get(['id', 'title']);
    }

    public function getMinChapterProperty(): ?int
    {
        if (! $this->novelId) return null;
        return NovelChapter::where('novel_id', $this->novelId)->min('chapter_number');
    }

    public function getMaxChapterProperty(): ?int
    {
        if (! $this->novelId) return null;
        return NovelChapter::where('novel_id', $this->novelId)->max('chapter_number');
    }

    public function getChapterProperty(): ?NovelChapter
    {
        if (! $this->novelId) return null;

        $q = NovelChapter::where('novel_id', $this->novelId);

        if ($this->chapterNumber !== null) {
            return $q->where('chapter_number', $this->chapterNumber)->first();
        }

        return $q->orderBy('chapter_number', 'asc')->first();
    }

    // Kaynak dile göre hedef dil seçenekleri (kaynak dil hariç)
    public function getTgtLangOptionsProperty(): array
    {
        $options = ['original' => 'Original'];
        foreach ($this->languages as $code => $label) {
            if ($code !== $this->srcLang) {
                $options[$code] = $label;
            }
        }
        return $options;
    }

    public function updatedNovelId(): void
    {
        $this->chapterNumber = $this->minChapter;
        $this->updateUrl();
    }

    public function updatedChapterNumber(): void
    {
        $this->updateUrl();
    }

    public function updatedSrcLang(): void
    {
        // Kaynak dil değişince hedef dili sıfırla
        $this->tgtLang = 'original';
        $this->translationPending = false;
        $this->updateUrl();
    }

    public function updatedTgtLang(): void
    {
        $this->updateUrl();

        if ($this->tgtLang === 'original') {
            $this->translationPending = false;
            return;
        }

        $chapter = $this->chapter;
        if (! $chapter) return;

        $exists = NovelChapterTranslation::query()
            ->where('novel_chapter_id', $chapter->id)
            ->where('target_lang', $this->tgtLang)
            ->exists();

        if ($exists) {
            $this->translationPending = false;
            return;
        }

        \App\Jobs\TranslateNovelChapterJob::dispatch($chapter->id, $this->tgtLang, $this->srcLang);
        $this->translationPending = true;
    }

    public function goPrev(): void
    {
        if ($this->minChapter === null || $this->chapterNumber === null) return;
        if ($this->chapterNumber <= $this->minChapter) return;

        $this->chapterNumber--;
        $this->updateUrl();
        $this->triggerTranslationIfNeeded();
    }

    public function goNext(): void
    {
        if ($this->maxChapter === null || $this->chapterNumber === null) return;
        if ($this->chapterNumber >= $this->maxChapter) return;

        $this->chapterNumber++;
        $this->updateUrl();
        $this->triggerTranslationIfNeeded();
    }

    private function triggerTranslationIfNeeded(): void
    {
        if ($this->tgtLang === 'original') return;

        $chapter = $this->chapter;
        if (! $chapter) return;

        $exists = NovelChapterTranslation::query()
            ->where('novel_chapter_id', $chapter->id)
            ->where('target_lang', $this->tgtLang)
            ->exists();

        if ($exists) {
            $this->translationPending = false;
            return;
        }

        \App\Jobs\TranslateNovelChapterJob::dispatch($chapter->id, $this->tgtLang, $this->srcLang);
        $this->translationPending = true;
    }

    private function updateUrl(): void
    {
        if (! $this->novelId) return;

        $params = ['novel_id' => $this->novelId];
        if ($this->chapterNumber) $params['chapter'] = $this->chapterNumber;
        if ($this->srcLang !== 'en') $params['src'] = $this->srcLang;
        if ($this->tgtLang !== 'original') $params['tgt'] = $this->tgtLang;

        $this->dispatch('url-update', $params);
    }

    public function getSelectedNovelProperty(): ?Novel
    {
        if (! $this->novelId) return null;
        return Novel::query()->select(['id', 'title', 'created_at', 'scraped_at'])->find($this->novelId);
    }

    public function getReaderContentProperty(): string
    {
        $chapter = $this->chapter;
        if (! $chapter) return '';

        $original = (string) ($chapter->content ?? '');
        if ($original === '') return '';

        if ($this->tgtLang === 'original') {
            $this->translationPending = false;
            return $original;
        }

        $existing = NovelChapterTranslation::query()
            ->where('novel_chapter_id', $chapter->id)
            ->where('target_lang', $this->tgtLang)
            ->value('translated_content');

        if (is_string($existing) && $existing !== '') {
            $this->translationPending = false;
            return $existing;
        }

        $failKey = "novel_chapter_translation_failed:{$chapter->id}:{$this->tgtLang}";
        if (Cache::has($failKey)) {
            $this->translationPending = false;
            return $original;
        }

        $this->translationPending = true;
        return $original;
    }
}
