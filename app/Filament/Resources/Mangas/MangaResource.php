<?php

namespace App\Filament\Resources\Mangas;

use App\Filament\Resources\Mangas\Pages\CreateManga;
use App\Filament\Resources\Mangas\Pages\EditManga;
use App\Filament\Resources\Mangas\Pages\ListMangas;
use App\Filament\Resources\Mangas\Schemas\MangaForm;
use App\Filament\Resources\Mangas\Tables\MangasTable;
use App\Models\Manga;
use App\Models\Chapter;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Filament\Support\Icons\Heroicon;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use BackedEnum;
use UnitEnum;

class MangaResource extends Resource
{
    protected static ?string $model = Manga::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string | UnitEnum | null $navigationGroup = 'Manga';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return MangaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MangasTable::configure($table);
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
            'index' => ListMangas::route('/'),
            'create' => CreateManga::route('/create'),
            'edit' => EditManga::route('/{record}/edit'),
        ];
    }

    public static function getGlobalSearchResultUrl(EloquentModel $record): ?string
    {
        $firstChapterNumber = Chapter::query()
            ->where('manga_id', $record->getKey())
            ->min('chapter_number');

        $params = ['manga_id' => $record->getKey()];

        if ($firstChapterNumber !== null) {
            $params['chapter'] = (int) $firstChapterNumber;
        }

        return route('filament.admin.pages.manga-reader', $params);
    }
}
