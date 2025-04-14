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
        Schema::create(\App\Models\AplicacaoAcessoToken::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('token')->unique();
            $table->string('ip', 20);
            $table->unsignedTinyInteger('status');
            $table->timestamps();
            $table->foreignId('usuario_id')->constrained(\App\Models\Usuario::getTableName());
            $table->foreignId('aplicacao_id')->constrained(\App\Models\Aplicacao::getTableName());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\AplicacaoAcessoToken::getTableName());
    }
};
