<?php

namespace App\Listeners;

use App\Events\ScheduleBatchFinishedWithUpdates;
use App\Models\FollowedSeries;
use App\Models\User;
use App\Notifications\NewChapterNotification;
use App\Models\Manga;
use App\Models\Novel;
use Illuminate\Support\Facades\Cache;

class SendNewChapterNotifications
{
    public function handle(ScheduleBatchFinishedWithUpdates $event): void
    {
        $updates = collect($event->updates);

        $follows = FollowedSeries::query()
            ->get(['user_id', 'subject_type', 'subject_id'])
            ->groupBy('user_id');

        foreach ($follows as $userId => $userFollows) {
            // Idempotency guard
            $lockKey = "chapter_notif:batch:{$event->batchId}:user:{$userId}";
            if (!Cache::add($lockKey, 1, now()->addHours(6))) continue;

            $allowed = $userFollows
                ->map(fn($x) => $x->subject_type . '#' . $x->subject_id)
                ->flip();

            $filtered = $updates->filter(
                fn($u) => $allowed->has($u['subject_type'] . '#' . $u['subject_id'])
            );

            if ($filtered->isEmpty()) continue;

            $user = User::find($userId);
            if (!$user) continue;

            foreach ($filtered as $u) {
                // Frontend URL'si — admin panel URL'si değil
                if ($u['type'] === 'manga') {
                    $model = \App\Models\Manga::find($u['subject_id']);
                    $readerUrl = $model
                        ? route('site.manga.chapter', ['manga' => $model->slug, 'chapter' => $u['chapter_number']])
                        : ($u['reader_url'] ?? '');
                } else {
                    $model = \App\Models\Novel::find($u['subject_id']);
                    $readerUrl = $model
                        ? route('site.novel.chapter', ['novel' => $model->slug, 'chapter' => $u['chapter_number']])
                        : ($u['reader_url'] ?? '');
                }

                $user->notify(new NewChapterNotification(
                    subjectType:   $u['type'],
                    subjectId:     $u['subject_id'],
                    subjectTitle:  $u['subject_title'],
                    chapterNumber: $u['chapter_number'],
                    chapterTitle:  $u['chapter_title'] ?? '',
                    readerUrl:     $readerUrl,
                ));
            }
        }
    }
}
