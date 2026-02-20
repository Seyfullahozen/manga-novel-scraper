<?php

namespace App\Filament\Resources\Mangas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MangaForm
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
