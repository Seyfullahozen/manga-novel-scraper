<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comment_notifications', function (Blueprint $table) {
            $table->id();
            // Bildirimi alan kullanıcı (yorum sahibi)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Tetikleyen kullanıcı
            $table->foreignId('actor_id')->constrained('users')->cascadeOnDelete();
            // İlgili yorum
            $table->foreignId('comment_id')->constrained()->cascadeOnDelete();
            // like | dislike | reply
            $table->enum('type', ['like', 'dislike', 'reply']);
            // reply ise yeni yorumun id'si
            $table->foreignId('reply_id')->nullable()->constrained('comments')->cascadeOnDelete();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'read_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_notifications_tables');
    }
};
