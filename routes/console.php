<?php

use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
});

Schedule::command('scrape:refresh')
    ->dailyAt('14:05');
//Schedule::command('scrape:refresh')
//    ->dailyAt('16:45');
