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
        Schema::create(\App\Models\Aluno::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email')->unique();
            $table->string('uf', 2);

            $table->foreignId('grau_instrucao_id')->constrained(\App\Models\GrauInstrucao::getTableName());
            $table->foreignId('instituicao_ensino_id')->nullable()->constrained(\App\Models\InstituicaoEnsino::getTableName());

            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Aluno::getTableName());
    }
};
