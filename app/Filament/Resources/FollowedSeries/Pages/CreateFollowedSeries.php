<?php

namespace App\Filament\Resources\FollowedSeries\Pages;

use App\Filament\Resources\FollowedSeries\FollowedSeriesResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\Rule;

class CreateFollowedSeries extends CreateRecord
{
    protected static string $resource = FollowedSeriesResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();
        return $data;
    }

    protected function getFormMessages(): array
    {
        return [
            'subject_id.unique' => 'Bu seriyi zaten takip ediyorsun.',
        ];
    }
}
