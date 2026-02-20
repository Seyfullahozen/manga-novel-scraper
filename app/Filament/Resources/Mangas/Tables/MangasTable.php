<?php

namespace App\Filament\Resources\Mangas\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MangasTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
                ...parent::getOptionsColumns(),
            ];
    }
}
