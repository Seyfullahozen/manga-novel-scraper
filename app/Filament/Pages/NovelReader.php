<?php

namespace App\Filament\Pages;

use App\Models\Novel;
use App\Models\NovelChapter;
use Filament\Pages\Page;
use BackedEnum;
use UnitEnum;

class NovelReader extends Page
{
    protected static string|null|BackedEnum $navigationIcon = 'heroicon-o-book-open';
    protected string $view = 'filament.pages.novel-reader';
    protected static ?string $navigationLabel = 'Novel Reader';
    protected static ?string $title = 'Novel Reader';

    protected static string | UnitEnum | null $navigationGroup = 'Reader';

    public ?int $novelId = null;
    public ?int $chapterNumber = null;

    public string $search = '';

    public function mount(): void
    {
        $this->novelId = request()->query('novel_id') ? (int) request()->query('novel_id') : null;
        $this->chapterNumber = request()->query('chapter') ? (int) request()->query('chapter') : null;

        // novel seçili ama chapter yoksa default ilk chapter
        if ($this->novelId && $this->chapterNumber === null) {
            $this->chapterNumber = $this->minChapter;
        }
    }
    public function getNovelsProperty()
    {
        return Novel::query()
            ->when($this->search !== '', fn ($q) => $q->where('title', 'like', "%{$this->search}%"))
            ->orderBy('title')
            ->get(['id','title']);
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

    public function updatedNovelId(): void
    {
        $this->chapterNumber = $this->minChapter; // genelde 1, ama DB'de farklı olabilir
        $this->updateUrl();
    }

    public function updatedChapterNumber(): void
    {
        $this->updateUrl();
    }

    public function goPrev(): void
    {
        if ($this->minChapter === null || $this->chapterNumber === null) return;
        if ($this->chapterNumber <= $this->minChapter) return;

        $this->chapterNumber--;
        $this->updateUrl();
    }

    public function goNext(): void
    {
        if ($this->maxChapter === null || $this->chapterNumber === null) return;
        if ($this->chapterNumber >= $this->maxChapter) return;

        $this->chapterNumber++;
        $this->updateUrl();
    }

    private function updateUrl(): void
    {
        if (! $this->novelId) {
            return;
        }

        $params = ['novel_id' => $this->novelId];

        if ($this->chapterNumber) {
            $params['chapter'] = $this->chapterNumber;
        }

        // sadece params gönder
        $this->dispatch('url-update', $params);
    }

    public function getSelectedNovelProperty(): ?Novel
    {
        if (! $this->novelId) return null;

        return Novel::query()
            ->select(['id', 'title', 'created_at', 'scraped_at'])
            ->find($this->novelId);
    }
}
