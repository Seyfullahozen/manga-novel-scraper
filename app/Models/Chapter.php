<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
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

    public function manga(): BelongsTo
    {
        return $this->belongsTo(Manga::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ChapterImage::class)->orderBy('order');
    }
}
