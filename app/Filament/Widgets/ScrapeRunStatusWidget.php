<?php

namespace App\Filament\Widgets;

use App\Models\ScrapeRun;
use App\Models\ScrapeRunEvent;
use Livewire\Attributes\Url;
use Filament\Widgets\Widget;
use Filament\Notifications\Notification;

class ScrapeRunStatusWidget extends Widget
{
    protected string $view = 'filament.widgets.scrape-run-status-widget';

    public ?int $runId = null;
    public ?int $lastNotifiedEventId = null;
    public int $tickCount = 0;
    protected int|string|array $columnSpan = 'full';

    // ✅ EKLEME: Event listener tanımı
    protected $listeners = ['runIdUpdated' => 'setRunId'];

    public static function canView(): bool
    {
        return true;
    }

    // ✅ EKLEME: Event handler
    public function setRunId(int $runId): void
    {
        \Log::info('WIDGET_RUNID_SET', ['runId' => $runId]);
        $this->runId = $runId;
        $this->lastNotifiedEventId = null;
    }

    public function tick(): void
    {
        $this->tickCount++;
        \Log::info('WIDGET_TICK', ['runId' => $this->runId, 'tickCount' => $this->tickCount]);

        if (! $this->runId) return;

        $query = ScrapeRunEvent::query()
            ->where('scrape_run_id', $this->runId)
            ->orderBy('id');

        if ($this->lastNotifiedEventId) {
            $query->where('id', '>', $this->lastNotifiedEventId);
        }

        $newEvents = $query->limit(20)->get();

        \Log::info('WIDGET_NEW_EVENTS', ['count' => $newEvents->count()]);

        foreach ($newEvents as $index => $e) {
            $delay = $index * 500; // Her biri 500ms (0.5 saniye) arayla
            $this->dispatch('show-toast',
                level: $e->level,
                message: $e->message,
                delay: $delay
            );

            $this->lastNotifiedEventId = $e->id;
        }
    }

    public function mount(): void
    {
        // querystring kontrolü
        $this->runId = request()->integer('runId') ?: null;
        \Log::info('WIDGET_MOUNT', ['runId' => $this->runId]);
    }

    public function getRun(): ?ScrapeRun
    {
        return $this->runId ? ScrapeRun::find($this->runId) : null;
    }

    public function getEvents()
    {
        return $this->runId
            ? ScrapeRunEvent::where('scrape_run_id', $this->runId)->orderBy('id')->get()
            : collect();
    }

    public function showNotification(?string $level, ?string $message): void
    {
        if (!$level || !$message) {
            \Log::warning('SHOW_NOTIFICATION_NULL', ['level' => $level, 'message' => $message]);
            return;
        }

        \Log::info('SHOW_NOTIFICATION', ['level' => $level, 'message' => $message]);

        $n = Notification::make()->title($message);

        match($level) {
            'success' => $n->success(),
            'error', 'failed' => $n->danger(),
            default => $n->info(),
        };

        $n->send();
    }
}
