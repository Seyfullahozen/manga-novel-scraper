<?php

namespace App\Providers;

use App\Services\MangaScraping\DriverResolver;
use Illuminate\Support\ServiceProvider;

class MangaScrapingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $drivers = config('manga_scrapers.drivers');

        // local override varsa yükle
        $localPath = config_path('manga_scrapers.local.php');

        if (file_exists($localPath)) {
            $local = require $localPath;
            $drivers = $local['drivers'] ?? $drivers;
        }

        $this->app->singleton(DriverResolver::class, function () use ($drivers) {
            return new DriverResolver(
                array_map(fn ($driver) => app($driver), $drivers)
            );
        });

    }
}
