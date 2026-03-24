<?php

namespace App\Notifications\Channels;

use App\Notifications\NewChapterNotification;
use App\Services\Telegram\TelegramServices;
use Illuminate\Notifications\Notification;

class TelegramChannel
{
    public function __construct(private TelegramServices $telegram) {}

    public function send(object $notifiable, Notification $notification): void
    {
        if (! method_exists($notification, 'toTelegram')) return;
        if (! $notifiable->telegram_chat_id) return;

        $text = $notification->toTelegram($notifiable);
        $this->telegram->send($notifiable->telegram_chat_id, $text);
    }
}
