<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL enum'a yeni değer ekle
        DB::statement("ALTER TABLE comment_notifications MODIFY COLUMN type ENUM('like','dislike','reply','mention') NOT NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE comment_notifications MODIFY COLUMN type ENUM('like','dislike','reply') NOT NULL");
    }
};
