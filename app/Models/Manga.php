<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Manga extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'url',
        'scraped_at',   // ✅ ekle
    ];

    protected $casts = [
        'scraped_at' => 'datetime', // ✅ ekle
    ];

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('chapter_number');
    }

    public static function createFromUrl(string $url): self
    {
        $url = self::normalizeUrl($url); // ✅ fragment temizlendi

        $title = self::titleFromUrl($url);
        $slug  = Str::slug($title);

        return static::updateOrCreate(
            ['url' => $url],
            ['title' => $title, 'slug' => $slug]
        );
    }

    private static function normalizeUrl(string $url): string
    {
        $url = preg_replace('/#.*$/', '', $url);

        $url = trim($url);

        return $url;
    }

    private static function titleFromUrl(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH) ?? '';
        $path = trim($path, '/');

        $parts = explode('/', $path);
        $last  = end($parts) ?: 'novel';

        return Str::headline(str_replace('-', ' ', $last));
    }
}
