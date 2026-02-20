<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        \App\Events\ScheduleBatchFinishedWithUpdates::class => [
            \App\Listeners\SendTelegramUpdates::class,
        ],
    ];
}
