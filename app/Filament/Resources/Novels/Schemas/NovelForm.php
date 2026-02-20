<?php

namespace App\Filament\Resources\Novels\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NovelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('url')
                    ->url()
                    ->required(),
            ]);
    }
}
