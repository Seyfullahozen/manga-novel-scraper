<?php

namespace App\Filament\Resources\FollowedSeries\Pages;

use App\Filament\Resources\FollowedSeries\FollowedSeriesResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFollowedSeries extends ListRecords
{
    protected static string $resource = FollowedSeriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
