<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\AllChapterController;

Route::get('/', function () {
    return view('welcome');
});

Route::get("all", [AllChapterController::class, 'index']);

Route::get("view-chapter", [AllChapterController::class, 'viewChapter']);
Route::get("show-chapter", [AllChapterController::class, 'showChapter']);
