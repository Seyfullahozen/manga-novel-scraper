<?php

namespace App\Filament\Resources\ChapterImages\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class ChapterImagesTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
                TextColumn::make('chapter.manga.title')
                    ->label('Manga')
                    ->searchable(),

                TextColumn::make('chapter.title')
                    ->label('Chapter')
                    ->searchable(),

                ImageColumn::make('url')
                    ->label('Image')
                    ->square()
                    ->height(80),
                TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
            ];
    }
}
