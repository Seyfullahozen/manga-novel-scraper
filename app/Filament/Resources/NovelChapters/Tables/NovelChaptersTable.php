<?php

namespace App\Filament\Resources\NovelChapters\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NovelChaptersTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
                TextColumn::make('novel.title')
                    ->searchable(),
                ...parent::getNumberAndIs_ScrapedColumns(),
                TextColumn::make('content')
                    ->limit(300)      // 80 çok az
                    ->wrap()
                    ->lineClamp(5)    // satır sayısı
                    ->toggleable(),
            ];
    }
}
