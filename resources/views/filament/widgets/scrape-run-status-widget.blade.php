<div
    wire:poll.1s="tick"
    x-data="{}"
    x-on:show-toast.window="(event) => {
        const { level, message, delay = 0 } = event.detail;

        // ✅ Delay ile toast göster
        setTimeout(() => {
            console.log('TOAST EVENT RECEIVED:', level, message);
            $wire.showNotification(level, message);
        }, delay);
    }"
    class="border rounded p-4 space-y-2"
>
    <div class="text-xs bg-blue-50 p-2 rounded">
        WIDGET_RENDER ✅
        <br>
        runId: {{ $this->runId ?? 'NULL' }}
        <br>
        lastNotifiedEventId: {{ $this->lastNotifiedEventId ?? 'NULL' }}
        <br>
        tickCount: {{ $this->tickCount }}
    </div>

    <div class="text-xs bg-gray-100 p-2 rounded">
        🔄 Polling... tick_at: {{ now()->format('H:i:s') }}
    </div>
</div>
