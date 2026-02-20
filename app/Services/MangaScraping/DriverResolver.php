<?php

namespace App\Services\MangaScraping;

use App\Contracts\MangaSiteDriver;

class DriverResolver
{
    public function __construct(private readonly array $drivers) {}

    public function resolve(string $url): ?MangaSiteDriver
    {
        foreach ($this->drivers as $driver) {
            if ($driver->supports($url)) {
                return $driver;
            }
        }
        return null;
    }
}
