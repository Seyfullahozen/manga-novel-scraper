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
        Schema::create('scrape_run_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scrape_run_id')->constrained()->cascadeOnDelete();
            $table->string('level')->default('info'); // info|success|warning|error
            $table->string('message');
            $table->json('context')->nullable();
            $table->timestamps();

            $table->index(['scrape_run_id', 'id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scrape_run_events');
    }
};
