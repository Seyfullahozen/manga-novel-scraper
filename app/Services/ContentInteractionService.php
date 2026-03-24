<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class ContentInteractionService
{
    public function commentsFor(Model $model)
    {
        return $model->comments()->get();
    }

    public function reactionSummaryFor(Model $model)
    {
        return $model->contentReactions()
            ->selectRaw('type, count(*) as cnt')
            ->groupBy('type')
            ->pluck('cnt', 'type');
    }

    public function userReactionFor(Model $model, ?int $userId): ?string
    {
        if (! $userId) {
            return null;
        }

        return $model->contentReactions()
            ->where('user_id', $userId)
            ->value('type');
    }
}
