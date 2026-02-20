<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Pages\Page;
use Illuminate\Support\Facades\File;

class SupportedSites extends Page
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Desteklenen Siteler';
    protected static ?string $title = 'Desteklenen Siteler';

    protected string $view = 'filament.pages.supported-sites';

    public array $sites = [];

    public function mount(): void
    {
        $this->sites = $this->detectDrivers();
    }

    private function detectDrivers(): array
    {
        $sites = [];

        $sites = array_merge($sites, $this->detectFromPath(
            app_path('Services/MangaScraping/Drivers/Local'),
            'App\\Services\\MangaScraping\\Drivers\\Local\\',
            'manga'
        ));

        $sites = array_merge($sites, $this->detectFromPath(
            app_path('Services/NovelScraping/Drivers/Local'),
            'App\\Services\\NovelScraping\\Drivers\\Local\\',
            'novel'
        ));

        // aynı domain tekrar gelirse tekle
        $uniq = [];
        foreach ($sites as $s) {
            $uniq[$s['driver']] = $s;
        }

        return array_values($uniq);
    }

    private function detectFromPath(string $path, string $namespacePrefix, string $type): array
    {
        if (! File::exists($path)) return [];

        $out = [];

        foreach (File::files($path) as $file) {
            $className = $namespacePrefix . $file->getFilenameWithoutExtension();

            if (! class_exists($className)) continue;

            // driver instance lazim değil; static meta okuyacağız
            $out[] = $this->extractDriverInfo($className, $type);
        }

        return array_values(array_filter($out));
    }

    private function extractDriverInfo(string $driverClass, string $type): ?array
    {
        $classBase = class_basename($driverClass);
        $siteName = str_replace('Driver', '', $classBase);

        $url = method_exists($driverClass, 'siteUrl')
            ? (string) $driverClass::siteUrl()
            : '#';

        $logo = method_exists($driverClass, 'logo')
            ? (string) $driverClass::logo()
            : null;

        $domain = $url !== '#' ? (parse_url($url, PHP_URL_HOST) ?: 'unknown') : 'unknown';

        return [
            'name' => $siteName,
            'domain' => $domain,
            'url' => $url,
            'type' => $type,
            'driver' => $classBase,
            'logo' => $logo ? asset($logo) : null, // public path => full url
        ];
    }
}
