<?php

namespace App\Listeners;

use App\Events\ScheduleBatchFinishedWithUpdates;
use App\Models\FollowedSeries;
use App\Services\Telegram\TelegramServices;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class SendTelegramUpdates
{
    public function __construct(private TelegramServices $telegram) {}

    public function handle(ScheduleBatchFinishedWithUpdates $event): void
    {
        $updates = collect($event->updates);

        $follows = FollowedSeries::query()
            ->where('notify_telegram', true)
            ->get(['user_id','subject_type','subject_id'])
            ->groupBy('user_id');

        foreach ($follows as $userId => $userFollows) {
            $user = \App\Models\User::find($userId);
            if (! $user?->telegram_chat_id) continue;

            // ✅ Idempotency guard: aynı batch + user için 1 kere
            $lockKey = "tg_updates_sent:batch:{$event->batchId}:user:{$userId}";
            if (! Cache::add($lockKey, 1, now()->addHours(6))) {
                continue; // daha önce gönderilmiş
            }

            $allowed = $userFollows
                ->map(fn($x) => $x->subject_type.'#'.$x->subject_id)
                ->flip();

            $filtered = $updates->filter(function ($u) use ($allowed) {
                return $allowed->has($u['subject_type'].'#'.$u['subject_id']);
            });

            if ($filtered->isEmpty()) continue;

            $text = $this->formatMessage($event->batchId, $filtered);

            $this->telegram->send($user->telegram_chat_id, $text);
        }
    }

    private function formatMessage(string $batchId, Collection $items): string
    {
        $lines = [];
        $lines[] = "⚡ <b>Yeni Bölümler</b>";
        $lines[] = "";

        foreach ($items as $u) {
            $typeLabel = $u['type'] === 'manga' ? 'Manga' : 'Novel';
            $lines[] = "📌 <b>{$typeLabel}:</b> {$u['subject_title']}";
            $lines[] = "➡️ Bölüm {$u['chapter_number']} — {$u['chapter_title']}";
            if (!empty($u['reader_url'])) {
                $lines[] = $u['reader_url'];
            }
            if (! empty($u['reader_url'])) {
                $safeUrl = htmlspecialchars($u['reader_url'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
                $lines[] = "🔗 <a href=\"{$safeUrl}\">Bölümü aç</a>";
            }
            $lines[] = "";
        }

        return trim(implode("\n", $lines));
    }
}
