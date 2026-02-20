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
        Schema::table('chapters', function (Blueprint $table) {
            $table->foreignId('manga_id')->after('id')->constrained()->onDelete('cascade');
            $table->dropUnique(['url']);
            $table->unique(['manga_id', 'chapter_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chapters', function (Blueprint $table) {
            $table->dropForeign(['manga_id']);
            $table->dropUnique(['manga_id', 'chapter_number']);
            $table->dropColumn('manga_id');
            $table->unique('url');
        });
    }
};
