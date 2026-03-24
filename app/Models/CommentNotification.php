<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommentNotification extends Model
{
    protected $fillable = ['user_id', 'actor_id', 'comment_id', 'type', 'reply_id', 'read_at'];

    protected $casts = ['read_at' => 'datetime'];

    public function user(): BelongsTo   { return $this->belongsTo(User::class); }
    public function actor(): BelongsTo  { return $this->belongsTo(User::class, 'actor_id'); }
    public function comment(): BelongsTo { return $this->belongsTo(Comment::class); }
    public function reply(): BelongsTo  { return $this->belongsTo(Comment::class, 'reply_id'); }

    public function isUnread(): bool { return $this->read_at === null; }

    // Bildirim oluşturma — kendi kendine bildirim gitmesin
    public static function notify(int $userId, int $actorId, int $commentId, string $type, ?int $replyId = null): void
    {
        if ($userId === $actorId) return;

        // like/dislike için aynı kişiden duplicate engelle
        if (in_array($type, ['like', 'dislike'])) {
            static::updateOrCreate(
                ['user_id' => $userId, 'actor_id' => $actorId, 'comment_id' => $commentId, 'type' => $type],
                ['read_at' => null, 'reply_id' => null]
            );
        } else {
            static::create([
                'user_id'    => $userId,
                'actor_id'   => $actorId,
                'comment_id' => $commentId,
                'type'       => $type,
                'reply_id'   => $replyId,
                'read_at'    => null,
            ]);
        }
    }
}
