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
        Schema::table(\App\Models\CategoriaPergunta::getTableName(), function (Blueprint $table) {
            $table->foreignId('genero_textual_id')->constrained(\App\Models\GeneroTextual::getTableName());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\CategoriaPergunta::getTableName(), function (Blueprint $table) {
            $table->dropColumn(['genero_textual_id']);
        });
    }
};
