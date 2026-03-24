<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    protected $fillable = ['user_id', 'commentable_type', 'commentable_id', 'parent_id', 'body'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id')->with('user', 'reactions')->latest();
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(CommentReaction::class);
    }

    public function likesCount(): int
    {
        return $this->reactions->where('type', 'like')->count();
    }

    public function dislikesCount(): int
    {
        return $this->reactions->where('type', 'dislike')->count();
    }

    public function userReaction(?int $userId): ?string
    {
        if (!$userId) return null;
        return $this->reactions->where('user_id', $userId)->first()?->type;
    }
}
