<?php

namespace App\Filament\Pages;

use App\Models\Manga;
use App\Models\Chapter;
use BackedEnum;
use Filament\Pages\Page;
use UnitEnum;

class MangaReader extends Page
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-book-open';
    protected string $view = 'filament.pages.manga-reader';
    protected static ?string $navigationLabel = 'Manga Reader';
    protected static ?string $title = 'Manga Reader';


    protected static string | UnitEnum | null $navigationGroup = 'Reader';

    public ?int $mangaId = null;
    public ?int $chapterNumber = null;
    public string $search = '';

    // URL'den parametre almak için
    public function mount(): void
    {
        $this->mangaId = request()->query('manga_id') ? (int) request()->query('manga_id') : null;
        $this->chapterNumber = request()->query('chapter') ? (int) request()->query('chapter') : null;

        // novel seçili ama chapter yoksa default ilk chapter
        if ($this->mangaId && $this->chapterNumber === null) {
            $this->chapterNumber = $this->minChapter;
        }
    }

    public function getMangasProperty()
    {
        return Manga::query()
            ->when($this->search !== '', fn ($q) => $q->where('title', 'like', "%{$this->search}%"))
            ->orderBy('title')
            ->get(['id', 'title']);
    }

    public function getMinChapterProperty(): ?int
    {
        if (! $this->mangaId) return null;

        return Chapter::where('manga_id', $this->mangaId)->min('chapter_number');
    }

    public function getMaxChapterProperty(): ?int
    {
        if (! $this->mangaId) return null;

        return Chapter::where('manga_id', $this->mangaId)->max('chapter_number');
    }

    public function getChapterProperty(): ?Chapter
    {
        if (! $this->mangaId) return null;

        $q = Chapter::where('manga_id', $this->mangaId)->with('images');

        if ($this->chapterNumber !== null) {
            return $q->where('chapter_number', $this->chapterNumber)->first();
        }

        return $q->orderBy('chapter_number', 'asc')->first();
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

    public function updatedMangaId(): void
    {
        // Manga değişince ilk bölüme reset
        $this->chapterNumber = $this->minChapter;
        $this->updateUrl();
    }

    public function updatedChapterNumber(): void
    {
        $this->updateUrl();
    }

    private function updateUrl(): void
    {
        if (! $this->mangaId) {
            return;
        }

        $params = ['manga_id' => $this->mangaId];

        if ($this->chapterNumber) {
            $params['chapter'] = $this->chapterNumber;
        }

        // sadece params gönder
        $this->dispatch('url-update', $params);
    }

    public function getSelectedMangaProperty(): ?Manga
    {
        if (! $this->mangaId) return null;

        return Manga::query()
            ->select(['id', 'title', 'created_at', 'scraped_at'])
            ->find($this->mangaId);
    }
}
