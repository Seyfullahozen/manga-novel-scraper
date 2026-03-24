<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Concerns\HasContentInteractions;

class Chapter extends Model implements HasMedia
{
    use InteractsWithMedia, HasContentInteractions;

    protected $fillable = [
        'manga_id',
        'title',
        'url',
        'chapter_number',
        'is_scraped'
    ];

    protected $casts = [
        'is_scraped' => 'boolean',
        'chapter_number' => 'integer',
        'manga_id' => 'integer'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('chapter-images');
    }

    public function manga(): BelongsTo
    {
        return $this->belongsTo(Manga::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ChapterImage::class)->orderBy('order');
    }

    public function getFilamentTitle(): string
    {
        return $this->title;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->queued();
    }
}
