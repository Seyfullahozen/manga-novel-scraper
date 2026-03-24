<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ana yorumlar + yanıtlar (parent_id ile)
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Novel veya Manga için polymorphic
            $table->string('commentable_type');
            $table->unsignedBigInteger('commentable_id');

            // null = ana yorum, dolu = yanıt
            $table->foreignId('parent_id')->nullable()->constrained('comments')->cascadeOnDelete();

            $table->text('body');
            $table->timestamps();

            $table->index(['commentable_type', 'commentable_id']);
        });

        // Yorumlara like/dislike
        Schema::create('comment_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('comment_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['like', 'dislike']);
            $table->timestamps();

            $table->unique(['user_id', 'comment_id']);
        });

        // İçeriğe emoji tepki (novel/manga sayfasında)
        Schema::create('content_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('reactable_type');
            $table->unsignedBigInteger('reactable_id');
            $table->enum('type', ['love', 'super', 'sad', 'shocked', 'angry']);
            $table->timestamps();

            $table->unique(['user_id', 'reactable_type', 'reactable_id']);
            $table->index(['reactable_type', 'reactable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_reactions');
        Schema::dropIfExists('comment_reactions');
        Schema::dropIfExists('comments');
    }
};
