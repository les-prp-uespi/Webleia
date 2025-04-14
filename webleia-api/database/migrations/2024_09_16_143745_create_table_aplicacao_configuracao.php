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
        Schema::create(\App\Models\AplicacaoConfiguracao::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('chave');
            $table->string('valor');
            $table->foreignId('aplicacao_id')->constrained(\App\Models\Aplicacao::getTableName());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\AplicacaoConfiguracao::getTableName());
    }
};
