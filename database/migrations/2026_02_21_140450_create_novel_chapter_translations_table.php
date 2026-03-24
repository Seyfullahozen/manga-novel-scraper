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
        Schema::create('novel_chapter_translations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('novel_chapter_id')
                ->constrained('novel_chapters')
                ->cascadeOnDelete();

            $table->string('target_lang', 20); // ör: tr-TR
            $table->longText('translated_content');

            $table->timestamps();

            $table->unique(['novel_chapter_id', 'target_lang']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('novel_chapter_translations');
    }
};
