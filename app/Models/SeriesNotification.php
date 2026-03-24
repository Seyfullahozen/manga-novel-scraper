<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeriesNotification extends Model
{
    protected $fillable = [
        'user_id', 'subject_type', 'subject_id',
        'subject_title', 'chapter_number', 'chapter_title',
        'reader_url', 'read_at',
    ];

    protected $casts = ['read_at' => 'datetime'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }

    public function isUnread(): bool { return $this->read_at === null; }

    public function subjectTypeLabel(): string
    {
        return str_contains($this->subject_type, 'Manga') ? 'Manga' : 'Novel';
    }
}
