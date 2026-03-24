<?php

namespace App\Models\Concerns;

use App\Models\Comment;
use App\Models\ContentReaction;

trait HasContentInteractions
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')
            ->whereNull('parent_id')
            ->with(['user', 'reactions', 'replies.user', 'replies.reactions'])
            ->latest();
    }

    public function contentReactions()
    {
        return $this->morphMany(ContentReaction::class, 'reactable');
    }
}
