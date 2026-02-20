<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChapterImage extends Model
{
    protected $fillable = [
        'chapter_id',
        'title',
        'url',
        'order'
    ];

    protected $casts = [
        'chapter_id' => 'integer',
        'order' => 'integer'
    ];

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}
