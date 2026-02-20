<?php

namespace App\Filament\Resources\NovelChapters;

use App\Filament\Resources\NovelChapters\Pages\CreateNovelChapter;
use App\Filament\Resources\NovelChapters\Pages\EditNovelChapter;
use App\Filament\Resources\NovelChapters\Pages\ListNovelChapters;
use App\Filament\Resources\NovelChapters\Schemas\NovelChapterForm;
use App\Filament\Resources\NovelChapters\Tables\NovelChaptersTable;
use App\Models\NovelChapter;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class NovelChapterResource extends Resource
{
    protected static ?string $model = NovelChapter::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string | UnitEnum | null $navigationGroup = 'Novels';
    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return NovelChapterForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NovelChaptersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNovelChapters::route('/'),
            'create' => CreateNovelChapter::route('/create'),
            'edit' => EditNovelChapter::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }
}
