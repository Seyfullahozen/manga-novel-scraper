<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Services\Telegram\TelegramServices;

class NewChapterNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $subjectType,   // 'novel' | 'manga'
        public int    $subjectId,
        public string $subjectTitle,
        public int    $chapterNumber,
        public string $chapterTitle,
        public string $readerUrl,
    ) {}

    public function via(object $notifiable): array
    {
        $channels = ['database'];

        // Mail: kullanıcının email'i doğrulanmışsa
        if ($notifiable->email && $notifiable->email_verified_at) {
            $channels[] = 'mail';
        }

        // Telegram: chat_id varsa
        if ($notifiable->telegram_chat_id) {
            $channels[] = 'telegram';
        }

        return $channels;
    }

    // ---------- DATABASE ----------
    public function toDatabase(object $notifiable): array
    {
        return [
            'subject_type'   => $this->subjectType,
            'subject_id'     => $this->subjectId,
            'subject_title'  => $this->subjectTitle,
            'chapter_number' => $this->chapterNumber,
            'chapter_title'  => $this->chapterTitle,
            'reader_url'     => $this->readerUrl,
        ];
    }

    // ---------- MAIL ----------
    public function toMail(object $notifiable): MailMessage
    {
        $typeLabel = $this->subjectType === 'manga' ? 'Manga' : 'Novel';

        return (new MailMessage)
            ->subject("Yeni Bölüm: {$this->subjectTitle}")
            ->greeting("Merhaba!")
            ->line("Takip ettiğiniz {$typeLabel} serisinde yeni bir bölüm yayınlandı.")
            ->line("**{$this->subjectTitle}** — Bölüm {$this->chapterNumber}: {$this->chapterTitle}")
            ->action('Bölümü Oku', $this->readerUrl)
            ->line('İyi okumalar!');
    }

    // ---------- TELEGRAM (custom kanal) ----------
    public function toTelegram(object $notifiable): string
    {
        $typeLabel = $this->subjectType === 'manga' ? 'Manga' : 'Novel';
        $safeUrl   = htmlspecialchars($this->readerUrl, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return implode("\n", [
            "⚡ <b>Yeni Bölüm</b>",
            "",
            "📌 <b>{$typeLabel}:</b> {$this->subjectTitle}",
            "➡️ Bölüm {$this->chapterNumber} — {$this->chapterTitle}",
            "🔗 <a href=\"{$safeUrl}\">Bölümü aç</a>",
        ]);
    }
}
