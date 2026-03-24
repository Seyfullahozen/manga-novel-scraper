<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Concerns\HasContentInteractions;

class NovelChapter extends Model
{
    use HasContentInteractions;
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

    public function getFilamentTitle(): string
    {
        return $this->title;
    }
}
