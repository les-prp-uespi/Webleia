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
        Schema::table(\App\Models\ProducaoTextualResposta::getTableName(), function (Blueprint $table) {
            $table->unsignedTinyInteger('uso_texto_final')->default(\App\Config\Constantes::SIM);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\ProducaoTextualResposta::getTableName(), function (Blueprint $table) {
            $table->dropColumn('uso_texto_final');
        });
    }
};
