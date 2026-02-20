<?php

namespace App\Filament\Resources\Chapters\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ChapterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('manga_id')
                    ->relationship('manga', 'title')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                TextInput::make('url')
                    ->url()
                    ->required(),
                TextInput::make('chapter_number')
                    ->numeric(),
                Toggle::make('is_scraped')
                    ->required(),
            ]);
    }
}
