<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\ScheduleBatchFinishedWithUpdates;
use App\Listeners\SendNewChapterNotifications;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        \App\Events\ScheduleBatchFinishedWithUpdates::class => [
            SendNewChapterNotifications::class,
        ],
    ];
}
