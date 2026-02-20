<?php

namespace App\Providers;

use App\Services\NovelScraping\Drivers\Local\NovelbinDriver;
use App\Services\NovelScraping\Drivers\Local\EmpireNovelDriver;
use App\Services\NovelScraping\Drivers\Local\NovelOkutrDriver;
use App\Services\NovelScraping\DriverResolver;
use Illuminate\Support\ServiceProvider;

class NovelScrapingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(DriverResolver::class, function () {
            return new DriverResolver([
                app(NovelbinDriver::class),
                app(EmpireNovelDriver::class),
                app(NovelOkutrDriver::class),
            ]);
        });
    }
}
