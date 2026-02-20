<?php

namespace App\Filament\Resources\NovelChapters\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NovelChapterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('novel_id')
                    ->relationship('novel', 'title')
                    ->required(),
                TextInput::make('chapter_number')
                    ->required()
                    ->numeric(),
                TextInput::make('title')
                    ->required(),
                TextInput::make('url')
                    ->url(),
                Textarea::make('content')
                    ->columnSpanFull(),
                Toggle::make('is_scraped')
                    ->required(),
            ]);
    }
}
