<?php

namespace App\Filament\Resources\ChapterImages\Pages;

use App\Filament\Resources\ChapterImages\ChapterImageResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditChapterImage extends EditRecord
{
    protected static string $resource = ChapterImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
