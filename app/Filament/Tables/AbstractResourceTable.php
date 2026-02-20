<?php

namespace App\Filament\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

abstract class AbstractResourceTable
{
    final public static function configure(Table $table): Table
    {
        return $table
            ->columns(static::getAllColumns())
            ->recordActions(static::getRecordActions())
            ->toolbarActions(static::getToolbarActions())
            ->paginationPageOptions([10, 25, 50, 100]);
    }

    /**
     * Child class SADECE kendi kolonlarını döner.
     */
    abstract protected static function getColumns(): array;

    /**
     * Default + child kolonları birleştirir
     */
    protected static function getAllColumns(): array
    {
        return array_merge(
            static::getBaseColumns(),
            static::getColumns(),
            static::getTimestampColumns()
        );
    }

    /**
     * HER tabloda olan ama timestamp olmayan kolonlar
     */
    protected static function getBaseColumns(): array
    {
        return [
            TextColumn::make('title')
                ->limit(35)
                ->searchable(),
        ];
    }

    // 👇 opsiyonel alanlar burada
    protected static function getOptionsColumns(): array
    {
        return [
            TextColumn::make('url')
                ->searchable(),
            TextColumn::make('scraped_at')
                ->label('Scraped At')
                ->dateTime('d.m.Y H:i')
                ->sortable(),
        ];
    }

    // 👇 opsiyonel alanlar burada
    protected static function getNumberAndIs_ScrapedColumns(): array
    {
        return [
            TextColumn::make('chapter_number')
                ->numeric()
                ->sortable(),
            IconColumn::make('is_scraped')
                ->boolean(),
        ];
    }

    protected static function getTimestampColumns(): array
    {
        return [
            TextColumn::make('created_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),

            TextColumn::make('updated_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ];
    }

    protected static function getRecordActions(): array
    {
        return [];
    }

    protected static function getToolbarActions(): array
    {
        return [
            BulkActionGroup::make([
                DeleteBulkAction::make()
                    ->modalHeading('Kayıtları Sil')
                    ->modalDescription('Bu kayıtları silmek istediğinize emin misiniz?')
                    ->modalSubmitActionLabel('Evet, sil'),
            ]),
        ];
    }
}
