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
        Schema::table(\App\Models\Pergunta::getTableName(), function (Blueprint $table) {
            $table->string('titulo');
            $table->text('exemplo')->nullable();
            $table->text('tutorial')->nullable();
            $table->unsignedInteger('obrigatorio')->default(\App\Config\Constantes::SIM);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table(\App\Models\Pergunta::getTableName(), function (Blueprint $table) {
            $table->dropColumn(['titulo', 'exemplo', 'tutorial', 'obrigatorio']);
        });
    }
};
