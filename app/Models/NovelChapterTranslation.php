<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NovelChapterTranslation extends Model
{
    protected $fillable = [
        'novel_chapter_id',
        'target_lang',
        'translated_content',
    ];

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(NovelChapter::class, 'novel_chapter_id');
    }
}
