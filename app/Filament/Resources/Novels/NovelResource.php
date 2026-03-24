<?php

namespace App\Filament\Resources\Novels;

use App\Filament\Resources\Novels\Pages\CreateNovel;
use App\Filament\Resources\Novels\Pages\EditNovel;
use App\Filament\Resources\Novels\Pages\ListNovels;
use App\Filament\Resources\Novels\Schemas\NovelForm;
use App\Filament\Resources\Novels\Tables\NovelsTable;
use App\Models\NovelChapter;
use App\Models\Novel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use UnitEnum;

class NovelResource extends Resource
{
    protected static ?string $model = Novel::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string | UnitEnum | null $navigationGroup = 'Novels';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return NovelForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NovelsTable::configure($table);
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
            'index' => ListNovels::route('/'),
            'create' => CreateNovel::route('/create'),
            'edit' => EditNovel::route('/{record}/edit'),
        ];
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function getGlobalSearchResultUrl(EloquentModel $record): ?string
    {
        $firstChapterNumber = NovelChapter::query()
            ->where('novel_id', $record->getKey())
            ->min('chapter_number');

        $params = ['novel_id' => $record->getKey()];

        if ($firstChapterNumber !== null) {
            $params['chapter'] = (int) $firstChapterNumber;
        }

        return route('filament.admin.pages.novel-reader', $params);
    }
}
