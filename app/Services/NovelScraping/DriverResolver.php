<?php

namespace App\Services\NovelScraping;

use App\Contracts\NovelSiteDriver;

class DriverResolver
{
    public function __construct(private array $drivers) {}

    public function resolve(string $url): ?NovelSiteDriver
    {
        foreach ($this->drivers as $driver) {
            if ($driver->supports($url)) {
                return $driver;
            }
        }
        return null;
    }
}
