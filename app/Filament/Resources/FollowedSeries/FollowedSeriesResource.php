<?php

namespace App\Filament\Resources\FollowedSeries;

use App\Filament\Resources\FollowedSeries\Pages\CreateFollowedSeries;
use App\Filament\Resources\FollowedSeries\Pages\EditFollowedSeries;
use App\Filament\Resources\FollowedSeries\Pages\ListFollowedSeries;
use App\Filament\Resources\FollowedSeries\Schemas\FollowedSeriesForm;
use App\Filament\Resources\FollowedSeries\Tables\FollowedSeriesTable;
use App\Models\FollowedSeries;
use App\Models\Manga;
use App\Models\Novel;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables;
use Filament\Forms;
use BackedEnum;
use Filament\Schemas\Components\Utilities\Get;
use Illuminate\Validation\Rule;

class FollowedSeriesResource extends Resource
{
    protected static ?string $model = FollowedSeries::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'FollowedSeries.php';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Toggle::make('notify_telegram')
                ->label('Telegram bildirimi')
                ->default(true),

            Select::make('subject_type')
                ->label('Tür')
                ->options([
                    \App\Models\Manga::class => 'Manga',
                    \App\Models\Novel::class => 'Novel',
                ])
                ->reactive()
                ->required(),

            Select::make('subject_id')
                ->label('Seri')
                ->searchable()
                ->required()
                ->options(function (Get $get) {
                    $type = $get('subject_type');

                    if ($type === Manga::class) {
                        return Manga::query()->orderBy('title')->pluck('title', 'id');
                    }

                    if ($type === Novel::class) {
                        return Novel::query()->orderBy('title')->pluck('title', 'id');
                    }

                    return [];
                })
                ->rules([
                    fn (Get $get) => Rule::unique('followed_series', 'subject_id')
                        ->where(fn ($q) => $q
                            ->where('user_id', auth()->id())
                            ->where('subject_type', $get('subject_type'))
                        ),
                ])
                ->validationMessages([
                    'unique' => 'Bu seriyi zaten takip ediyorsun.',
                ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Tür')
                    ->formatStateUsing(fn($s) => $s === \App\Models\Manga::class ? 'Manga' : 'Novel'),

                Tables\Columns\TextColumn::make('subject.title')
                    ->label('Seri')
                    ->searchable(),

                Tables\Columns\IconColumn::make('notify_telegram')
                    ->boolean()
                    ->label('Telegram'),
            ])
            ->modifyQueryUsing(function ($query) {
                $userId = auth()->id();

                if (! $userId) {
                    // Login yoksa boş liste döndür
                    return $query->whereRaw('1=0');
                }

                return $query->where('user_id', $userId);
            });
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
            'index' => ListFollowedSeries::route('/'),
            'create' => CreateFollowedSeries::route('/create'),
            'edit' => EditFollowedSeries::route('/{record}/edit'),
        ];
    }
}
