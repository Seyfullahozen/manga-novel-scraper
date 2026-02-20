<?php

namespace App\Filament\Resources\Chapters\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ChaptersTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
                TextColumn::make('manga.title')
                    ->searchable(),
                ...parent::getNumberAndIs_ScrapedColumns(),
            ];
    }
}
