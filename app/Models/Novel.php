<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Concerns\HasContentInteractions;

class Novel extends Model implements HasMedia
{
    use InteractsWithMedia, HasContentInteractions;
    protected $fillable = [
        'title',
        'slug',
        'url',
        'scraped_at',
        'author',
        'cover_url',
        'click_count',
    ];

    protected $casts = [
        'scraped_at' => 'datetime',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')
            ->singleFile()
            ->useFallbackUrl(asset('assets/images/img.png'));
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(85)
            ->performOnCollections('cover')
            ->nonQueued();

        $this->addMediaConversion('thumb')
            ->format('webp')
            ->width(300)
            ->height(420)
            ->quality(80)
            ->performOnCollections('cover')
            ->nonQueued();
    }

    public function getCoverUrl(): string
    {
        if ($this->hasMedia('cover')) {
            return $this->getFirstMediaUrl('cover', 'webp');
        }
        return $this->cover_url ?? asset('assets/images/img.png');
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(NovelChapter::class)->orderBy('chapter_number');
    }

    public static function createFromUrl(string $url): self
    {
        $url = self::normalizeUrl($url);
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

    public function getFilamentTitle(): string
    {
        return $this->title;
    }

    public function latestChapters(): HasMany
    {
        return $this->hasMany(NovelChapter::class)
            ->orderByDesc('chapter_number');
    }

    public function ratings()
    {
        return $this->hasMany(\App\Models\NovelRating::class);
    }

    public function followedSeries()
    {
        return $this->morphMany(\App\Models\FollowedSeries::class, 'subject');
    }
}
