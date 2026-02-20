<?php

namespace App\Filament\Resources\Mangas\Pages;

use App\Jobs\ScrapeMangaJob;
use App\Services\MangaScraping\DriverResolver;
use App\Filament\Resources\Mangas\MangaResource;
use Filament\Actions\Action as FormAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use App\Models\ScrapeRun;

class CreateManga extends CreateRecord
{
    protected static string $resource = MangaResource::class;

    public ?int $runId = null;

    protected function getFormActions(): array
    {
        return [
            FormAction::make('scrape')
                ->label('Scrape Et')
                ->action(function (DriverResolver $resolver) {

                    \Log::info('CREATE_MANGA_ACTION_FIRED');
                    Notification::make()->title('ACTION ÇALIŞTI ✅')->success()->send();

                    $data = $this->form->getState();

                    if (empty($data['url'])) {
                        Notification::make()
                            ->title('URL zorunlu')
                            ->danger()
                            ->send();
                        return;
                    }

                    $driver = $resolver->resolve($data['url']);

                    if (! $driver) {
                        Notification::make()
                            ->title('Tanınmayan site')
                            ->body('Bu URL için destek yok.')
                            ->danger()
                            ->send();
                        return;
                    }

                    $run = ScrapeRun::create([
                        'type' => 'manga',
                        'url' => $data['url'],
                        'status' => 'queued',
                        'trigger' => 'manual',
                    ]);

                    $this->runId = $run->id;

                    ScrapeMangaJob::dispatch($data['url'], $run->id);

                    Notification::make()
                        ->title('Kuyruğa alındı')
                        ->body("Run #{$run->id} oluşturuldu. Scrape arka planda başlayacak.")
                        ->success()
                        ->send();

                    // ✅ EKLEME: Livewire queryString sync
                    $this->dispatch('runIdUpdated', runId: $run->id);
                }),

            $this->getCancelFormAction(),
        ];
    }

    protected function getFooterWidgets(): array
    {
        return [
            \App\Filament\Widgets\ScrapeRunStatusWidget::class,
        ];
    }

    // ✅ EKLEME: Livewire queryString tanımı
    protected function getQueryStringParams(): array
    {
        return [
            'runId' => ['except' => null],
        ];
    }
}
