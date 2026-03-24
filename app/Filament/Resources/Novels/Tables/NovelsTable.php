<?php

namespace App\Filament\Resources\Novels\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NovelsTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
            ImageColumn::make('cover_url')
                ->label('Kapak')
                ->width(48)
                ->height(68)
                ->defaultImageUrl(asset('images/no-cover.png'))
                ->extraImgAttributes(['class' => 'rounded object-cover']),
            ...parent::getOptionsColumns(),
            TextColumn::make('author')
                ->label('Yazar')
                ->searchable()
                ->sortable()
                ->placeholder('—'),

            ];
    }
}
