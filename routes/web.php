<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReadingHistoryController;
use App\Http\Controllers\SeriesNotificationController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserSocialController;

// Ana sayfa — novel + manga karışık
Route::get('/', [SiteController::class, 'index'])->name('site.home');

// Novel
Route::get('/novel', [NovelController::class, 'home'])->name('site.novel.home');
Route::get('/novel/liste', [NovelController::class, 'list'])->name('site.novel.list');
Route::get('/novel/{novel:slug}', [NovelController::class, 'show'])->name('site.novel.show');
Route::get('/novel/{novel:slug}/bolum/{chapter}', [NovelController::class, 'reader'])
    ->whereNumber('chapter')
    ->name('site.novel.chapter');

// Manga
Route::get('/manga', [MangaController::class, 'home'])->name('site.manga.home');
Route::get('/manga/liste', [MangaController::class, 'list'])->name('site.manga.list');
Route::get('/manga/{manga:slug}', [MangaController::class, 'show'])->name('site.manga.show');
Route::get('/manga/{manga:slug}/bolum/{chapter}', [MangaController::class, 'reader'])
    ->whereNumber('chapter')
    ->name('site.manga.chapter');

Route::get('/kullanici/{username}', [UserSocialController::class, 'profile'])->name('user.profile');
Route::get('/kullanici/{username}/yorumlar', [UserSocialController::class, 'profileComments'])->name('user.profile.comments');
Route::get('/kullanici/{username}/seriler', [UserSocialController::class, 'profileSeries'])->name('user.profile.series');
Route::get('/kullanici/{username}/takipciler', [UserSocialController::class, 'profileFollowers'])->name('user.profile.followers');
Route::get('/kullanici/{username}/takip-ettikleri', [UserSocialController::class, 'profileFollowing'])->name('user.profile.following');

Route::middleware('auth')->group(function () {
    Route::get('/profil', [ProfileController::class, 'show'])->name('site.profile');
    Route::patch('/profil', [ProfileController::class, 'update'])->name('site.profile.update');

    Route::post('/kullanici/{username}/takip', [UserSocialController::class, 'follow'])->name('user.follow');
    Route::post('/kullanici/{username}/engelle', [UserSocialController::class, 'block'])->name('user.block');
    Route::get('/kullanici-ara', [UserSocialController::class, 'search'])->name('user.search');
    Route::get('/arkadaslarim', [UserSocialController::class, 'friends'])->name('site.friends');

    Route::post('/follow/{type}/{id}', [FollowController::class, 'toggle'])->name('follow.toggle');
    Route::post('/rate/{type}/{id}', [RatingController::class, 'rate'])->name('rate');

    Route::get('/takip-ettiklerim', [FollowController::class, 'index'])->name('site.followed');
    Route::get('/son-okuduklarim', [ReadingHistoryController::class, 'index'])->name('site.reading.history');

    Route::post('/yorum', [CommentController::class, 'store'])->name('comment.store');
    Route::delete('/yorum/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
    Route::post('/yorum/{comment}/tepki', [CommentController::class, 'react'])->name('comment.react');
    Route::post('/icerik-tepki', [CommentController::class, 'contentReact'])->name('content.react');

    // web.php — auth middleware grubuna ekle:
    Route::get('/yorumlarim', [CommentController::class, 'myComments'])->name('site.my.comments');
    Route::get('/bildirimler', [CommentController::class, 'notifications'])->name('site.comment.notifications');
    Route::get('/bildirim-sayisi', [CommentController::class, 'unreadCount'])->name('comment.unread.count');
    Route::get('/bildirim-onizleme', [CommentController::class, 'notificationsPreview'])->name('comment.notifications.preview');

    // web.php — auth middleware grubuna ekle:
    Route::get('/seri-bildirim-sayisi', [SeriesNotificationController::class, 'unreadCount'])->name('series.notif.count');
    Route::post('/seri-bildirimleri-oku', [SeriesNotificationController::class, 'markAllRead'])->name('series.notif.mark-read');
});

Route::get('/arama/live', [App\Http\Controllers\SearchController::class, 'live'])->name('site.search.live');

require __DIR__.'/auth.php';
