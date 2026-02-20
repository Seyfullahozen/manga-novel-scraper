<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NovelChapter extends Model
{
    protected $fillable = [
        'novel_id',
        'chapter_number',
        'title',
        'url',
        'content',
        'is_scraped',
    ];

    protected $casts = [
        'chapter_number' => 'integer',
        'is_scraped' => 'boolean',
    ];

    public function novel(): BelongsTo
    {
        return $this->belongsTo(Novel::class);
    }
}
