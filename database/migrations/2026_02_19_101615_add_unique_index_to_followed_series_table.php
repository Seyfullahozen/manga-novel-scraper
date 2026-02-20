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
        Schema::table('followed_series', function (Blueprint $table) {
            // user_id + subject_type + subject_id aynı kombinasyon 1 kez olsun
            $table->unique(['user_id', 'subject_type', 'subject_id'], 'followed_series_user_subject_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('followed_series', function (Blueprint $table) {
            $table->dropUnique('followed_series_user_subject_unique');
        });
    }
};
