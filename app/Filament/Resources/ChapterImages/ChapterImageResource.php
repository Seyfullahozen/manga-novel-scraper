<?php

namespace App\Filament\Resources\ChapterImages;

use App\Filament\Resources\ChapterImages\Pages\CreateChapterImage;
use App\Filament\Resources\ChapterImages\Pages\EditChapterImage;
use App\Filament\Resources\ChapterImages\Pages\ListChapterImages;
use App\Filament\Resources\ChapterImages\Schemas\ChapterImageForm;
use App\Filament\Resources\ChapterImages\Tables\ChapterImagesTable;
use App\Models\ChapterImage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ChapterImageResource extends Resource
{
    protected static ?string $model = ChapterImage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string | UnitEnum | null $navigationGroup = 'Manga';

    public static function form(Schema $schema): Schema
    {
        return ChapterImageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ChapterImagesTable::configure($table);
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
            'index' => ListChapterImages::route('/'),
            'create' => CreateChapterImage::route('/create'),
            'edit' => EditChapterImage::route('/{record}/edit'),
        ];
    }
}
