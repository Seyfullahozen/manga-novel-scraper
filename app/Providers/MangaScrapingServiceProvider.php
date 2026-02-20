<?php

namespace App\Providers;

use App\Services\MangaScraping\DriverResolver;
use App\Services\MangaScraping\Drivers\Local\MangazureDriver;
use App\Services\MangaScraping\Drivers\Local\GolgebahcesiDriver;
use App\Services\MangaScraping\Drivers\Local\NabiMangaDriver;
use Illuminate\Support\ServiceProvider;

class MangaScrapingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(DriverResolver::class, function () {
            return new DriverResolver([
                app(MangazureDriver::class),
                app(GolgebahcesiDriver::class),
                app(NabiMangaDriver::class),
            ]);
        });
    }
}
