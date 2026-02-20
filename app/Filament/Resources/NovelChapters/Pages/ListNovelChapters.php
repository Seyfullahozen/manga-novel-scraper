<?php

namespace App\Filament\Resources\NovelChapters\Pages;

use App\Filament\Resources\NovelChapters\NovelChapterResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListNovelChapters extends ListRecords
{
    protected static string $resource = NovelChapterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
