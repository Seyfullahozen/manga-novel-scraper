<?php

namespace App\Filament\Resources\ChapterImages\Pages;

use App\Filament\Resources\ChapterImages\ChapterImageResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListChapterImages extends ListRecords
{
    protected static string $resource = ChapterImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
