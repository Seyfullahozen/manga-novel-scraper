<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReadingHistory extends Model
{
    protected $table = 'reading_history';

    protected $fillable = [
        'user_id',
        'readable_type',
        'readable_id',
        'chapter_type',
        'chapter_id',
        'chapter_number',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Novel veya Manga
    public function readable(): MorphTo
    {
        return $this->morphTo();
    }

    // NovelChapter veya MangaChapter
    public function chapter(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Okuma geçmişini kaydet veya güncelle.
     * Manga eklendiğinde de aynı method kullanılır.
     */
    public static function record(
        int $userId,
        string $readableType,
        int $readableId,
        string $chapterType,
        int $chapterId,
        int $chapterNumber
    ): void {
        static::updateOrCreate(
            [
                'user_id'       => $userId,
                'readable_type' => $readableType,
                'readable_id'   => $readableId,
            ],
            [
                'chapter_type'   => $chapterType,
                'chapter_id'     => $chapterId,
                'chapter_number' => $chapterNumber,
                'read_at'        => now(),
            ]
        );
    }

    /**
     * Sadece daha ilerideki bir bölüm okunuyorsa güncelle.
     * Kullanıcı geri gidip eski bölümü açarsa ilerleme geriye gitmesin.
     */
    public static function recordIfAhead(
        int $userId,
        string $readableType,
        int $readableId,
        string $chapterType,
        int $chapterId,
        int $chapterNumber
    ): void {
        $existing = static::where('user_id', $userId)
            ->where('readable_type', $readableType)
            ->where('readable_id', $readableId)
            ->first();

        if (!$existing || $chapterNumber > $existing->chapter_number) {
            static::updateOrCreate(
                [
                    'user_id'       => $userId,
                    'readable_type' => $readableType,
                    'readable_id'   => $readableId,
                ],
                [
                    'chapter_type'   => $chapterType,
                    'chapter_id'     => $chapterId,
                    'chapter_number' => $chapterNumber,
                    'read_at'        => now(),
                ]
            );
        }
    }

    public static function progressFor(?int $userId, string $readableType, int $readableId): ?int
    {
        if (! $userId) {
            return null;
        }

        return static::where('user_id', $userId)
            ->where('readable_type', $readableType)
            ->where('readable_id', $readableId)
            ->value('chapter_number');
    }
}
