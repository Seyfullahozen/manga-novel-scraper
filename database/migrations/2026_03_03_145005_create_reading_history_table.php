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
        Schema::create('reading_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Polymorphic — novel veya manga için
            $table->string('readable_type');   // App\Models\Novel | App\Models\Manga
            $table->unsignedBigInteger('readable_id');

            // En son okunan chapter
            $table->string('chapter_type');    // App\Models\NovelChapter | App\Models\MangaChapter
            $table->unsignedBigInteger('chapter_id');
            $table->unsignedInteger('chapter_number');

            $table->timestamp('read_at')->useCurrent();
            $table->timestamps();

            // Kullanıcı başına novel başına tek kayıt — güncellenir
            $table->unique(['user_id', 'readable_type', 'readable_id'], 'reading_history_unique');
            $table->index(['readable_type', 'readable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_history');
    }
};
