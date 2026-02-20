<?php

namespace App\Filament\Resources\Novels\Tables;

use App\Filament\Tables\AbstractResourceTable;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NovelsTable extends AbstractResourceTable
{
    protected static function getColumns(): array
    {
        return [
            ...parent::getOptionsColumns(),
            ];
    }
}
