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
        Schema::create('followed_series', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('subject_type');  // App\Models\Manga | App\Models\Novel
            $table->unsignedBigInteger('subject_id');

            $table->boolean('notify_telegram')->default(true);
            $table->timestamps();

            $table->unique(['user_id','subject_type','subject_id'], 'followed_series_unique');
            $table->index(['subject_type','subject_id'], 'followed_series_subject');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followed_series');
    }
};
