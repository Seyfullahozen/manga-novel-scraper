<?php

namespace App\Services\Telegram;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramServices
{
    public function send(string $chatId, string $text): void
    {
        $token = config('services.telegram.bot_token');
        if (! $token) return;

        Log::info('TG_SEND', [
            'chat_id' => $chatId,
            'text_hash' => sha1($text),
            'text_preview' => mb_substr($text, 0, 80),
            'ts' => microtime(true),
        ]);

        Http::timeout(15)->post("https://api.telegram.org/bot{$token}/sendMessage", [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => 'HTML',
            'disable_web_page_preview' => true,
        ]);
    }
}
