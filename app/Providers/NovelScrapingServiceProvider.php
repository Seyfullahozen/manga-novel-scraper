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
        $drivers = config('novel_scrapers.drivers');

        // local override varsa yükle
        $localPath = config_path('novel_scrapers.local.php');

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

    private function classFromFile(string $path): ?string
    {
        $contents = file_get_contents($path);

        if (! preg_match('/namespace\s+(.+?);/', $contents, $namespaceMatch)) {
            return null;
        }

        if (! preg_match('/class\s+([^\s]+)/', $contents, $classMatch)) {
            return null;
        }

        return $namespaceMatch[1] . '\\' . $classMatch[1];
    }
}
