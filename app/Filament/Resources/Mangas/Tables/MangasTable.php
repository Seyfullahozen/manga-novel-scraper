<?php

namespace App\Filament\Resources\Mangas\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MangasTable extends AbstractResourceTable
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
            TextColumn::make('description')
                ->limit(300)      // 80 çok az
                ->wrap()
                ->lineClamp(5)    // satır sayısı
                ->toggleable(),
        ];
    }
}
