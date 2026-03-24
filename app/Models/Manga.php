<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Concerns\HasContentInteractions;

class Manga extends Model implements HasMedia
{
    use InteractsWithMedia, HasContentInteractions;
    protected $fillable = [
        'title', 'slug', 'url', 'scraped_at',
        'cover_url', 'description', 'click_count',
    ];

    protected $casts = [
        'scraped_at'  => 'datetime',
        'click_count' => 'integer',
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
        return $this->hasMany(Chapter::class)->orderBy('chapter_number');
    }

    public function latestChapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderByDesc('chapter_number');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(MangaRating::class);
    }

    public function followedSeries()
    {
        return $this->morphMany(FollowedSeries::class, 'subject');
    }

    public static function createFromUrl(string $url): self
    {
        $url   = self::normalizeUrl($url);
        $title = self::titleFromUrl($url);
        $slug  = Str::slug($title);

        return static::updateOrCreate(
            ['url'   => $url],
            ['title' => $title, 'slug' => $slug]
        );
    }

    private static function normalizeUrl(string $url): string
    {
        return trim(preg_replace('/#.*$/', '', $url));
    }

    private static function titleFromUrl(string $url): string
    {
        $path  = parse_url($url, PHP_URL_PATH) ?? '';
        $parts = explode('/', trim($path, '/'));
        $last  = end($parts) ?: 'manga';
        return Str::headline(str_replace('-', ' ', $last));
    }

    public function getFilamentTitle(): string
    {
        return $this->title;
    }
    protected static function booted(): void
    {
        static::deleting(function (Manga $manga) {
            $manga->chapters()->each(function ($chapter) {
                $chapter->clearMediaCollection('chapter-images');
                $chapter->delete();
            });
        });
    }

}
