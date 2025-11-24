<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('swapi_queries', function (Blueprint $table) {
            $table->id();
            $table->string('resource', 50);
            $table->unsignedInteger('duration_ms');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('swapi_queries');
    }
};

