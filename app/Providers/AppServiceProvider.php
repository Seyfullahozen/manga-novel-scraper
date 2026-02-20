<?php

namespace App\Providers;

use App\Models\Chapter;
use App\Models\NovelChapter;
use App\Observers\ChapterObserver;
use App\Observers\NovelChapterObserver;
use Illuminate\Support\ServiceProvider;

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
    }
}
