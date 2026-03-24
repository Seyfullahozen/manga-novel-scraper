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
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('email');
            $table->string('display_name')->nullable()->after('username');
            $table->string('avatar_url')->nullable()->after('display_name');
            $table->boolean('is_admin')->default(false)->index()->after('avatar_url');
            $table->timestamp('last_seen_at')->nullable()->index()->after('is_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username','display_name','avatar_url','is_admin','last_seen_at']);
        });
    }
};
