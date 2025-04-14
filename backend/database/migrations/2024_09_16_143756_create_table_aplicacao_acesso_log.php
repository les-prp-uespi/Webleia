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
        Schema::create(\App\Models\AplicacaoAcessoLog::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('metodo', 10);
            $table->text('params');
            $table->string('ip', 50);
            $table->dateTime('created_at');
            $table->foreignId('aplicacao_acesso_token_id')->constrained(\App\Models\AplicacaoAcessoToken::getTableName());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\AplicacaoAcessoLog::getTableName());
    }
};
