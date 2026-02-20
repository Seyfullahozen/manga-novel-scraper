<?php

namespace App\Filament\Resources\Novels\Pages;

use App\Filament\Resources\Novels\NovelResource;
use \App\Services\NovelScraping\DriverResolver;
use Filament\Actions\Action as FormAction;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use App\Jobs\ScrapeNovelJob;
use App\Models\ScrapeRun;

class CreateNovel extends CreateRecord
{
    protected static string $resource = NovelResource::class;

    public ?int $runId = null;

    protected function getFormActions(): array
    {
        return [
            FormAction::make('scrape')
                ->label('Scrape Et')
                ->action(function (DriverResolver $resolver) {

                    \Log::info('CREATE_NOVEL_ACTION_FIRED');

                    $data = $this->form->getState();

                    if (empty($data['url'])) {
                        Notification::make()
                            ->title('URL zorunlu')
                            ->danger()
                            ->send();
                        return;
                    }

                    if (! $resolver->resolve($data['url'])) {
                        Notification::make()
                            ->title('Tanınmayan site')
                            ->body('Bu URL için destek yok.')
                            ->danger()
                            ->send();
                        return;
                    }

                    $run = ScrapeRun::create([
                        'type' => 'novel',
                        'url' => $data['url'],
                        'status' => 'queued',
                        'trigger' => 'manual',
                    ]);

                    $this->runId = $run->id;

                    ScrapeNovelJob::dispatch($data['url'], $run->id);

                    Notification::make()
                        ->title('Kuyruğa alındı')
                        ->body("Run #{$run->id} oluşturuldu. Scrape arka planda başlayacak.")
                        ->success()
                        ->send();

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

    protected function getQueryStringParams(): array
    {
        return [
            'runId' => ['except' => null],
        ];
    }
}
