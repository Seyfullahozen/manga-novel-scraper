<?php

namespace App\Providers;

use App\Models\Chapter;
use App\Models\NovelChapter;
use App\Observers\ChapterObserver;
use App\Observers\NovelChapterObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Notifications\ChannelManager;
use App\Notifications\Channels\TelegramChannel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Chapter::observe(ChapterObserver::class);
        NovelChapter::observe(NovelChapterObserver::class);

        $this->app->make(ChannelManager::class)->extend('telegram', function ($app) {
            return $app->make(TelegramChannel::class);
        });
    }
}
