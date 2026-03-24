<?php

namespace App\Listeners;

use App\Events\ScheduleBatchFinishedWithUpdates;
use App\Models\FollowedSeries;
use App\Models\SeriesNotification;
use Illuminate\Support\Facades\Cache;

class SendWebNotifications
{
    public function handle(ScheduleBatchFinishedWithUpdates $event): void
    {
        $updates = collect($event->updates);

        // Takip eden tüm kullanıcıları çek, user_id'ye göre grupla
        $follows = FollowedSeries::query()
            ->get(['user_id', 'subject_type', 'subject_id'])
            ->groupBy('user_id');

        foreach ($follows as $userId => $userFollows) {
            // Idempotency: aynı batch + user için 1 kere
            $lockKey = "web_notif_sent:batch:{$event->batchId}:user:{$userId}";
            if (!Cache::add($lockKey, 1, now()->addHours(6))) {
                continue;
            }

            // Bu kullanıcının takip ettiği seriler
            $allowed = $userFollows
                ->map(fn($x) => $x->subject_type . '#' . $x->subject_id)
                ->flip();

            $filtered = $updates->filter(
                fn($u) => $allowed->has($u['subject_type'] . '#' . $u['subject_id'])
            );

            if ($filtered->isEmpty()) continue;

            // Her güncelleme için bildirim kaydı oluştur
            foreach ($filtered as $u) {
                SeriesNotification::create([
                    'user_id'        => $userId,
                    'subject_type'   => $u['subject_type'],
                    'subject_id'     => $u['subject_id'],
                    'subject_title'  => $u['subject_title'],
                    'chapter_number' => $u['chapter_number'],
                    'chapter_title'  => $u['chapter_title'] ?? null,
                    'reader_url'     => $u['reader_url'] ?? null,
                    'read_at'        => null,
                ]);
            }
        }
    }
}
