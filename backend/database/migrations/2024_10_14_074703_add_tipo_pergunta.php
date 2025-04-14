<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(\App\Models\Pergunta::getTableName(), function (Blueprint $table) {
            $table->unsignedTinyInteger('tipo')->default(\App\Models\Pergunta::TP_TEXT);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\Pergunta::getTableName(), function (Blueprint $table) {
            $table->dropColumn('tipo');
        });
    }
};
