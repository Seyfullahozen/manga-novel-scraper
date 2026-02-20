<?php

namespace App\Filament\Resources\FollowedSeries\Pages;

use App\Filament\Resources\FollowedSeries\FollowedSeriesResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFollowedSeries extends EditRecord
{
    protected static string $resource = FollowedSeriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['user_id'] = auth()->id();
        return $data;
    }
}
