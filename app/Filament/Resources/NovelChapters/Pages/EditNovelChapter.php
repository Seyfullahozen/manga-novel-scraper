<?php

namespace App\Filament\Resources\NovelChapters\Pages;

use App\Filament\Resources\NovelChapters\NovelChapterResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditNovelChapter extends EditRecord
{
    protected static string $resource = NovelChapterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
