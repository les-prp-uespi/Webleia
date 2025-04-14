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
        Schema::create(\App\Models\ProducaoTextualResposta::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->text('resposta');

            $table->unsignedBigInteger('producao_textual_id');
            $table->unsignedBigInteger('pergunta_id');

            $table->foreign('producao_textual_id', 'ptr_producao_textual_fk')
                ->references('id')
                ->on(\App\Models\ProducaoTextual::getTableName());
            $table->foreign('pergunta_id', 'ptr_pergunta_fk')
                ->references('id')
                ->on(\App\Models\Pergunta::getTableName());
            $table->unique(['producao_textual_id', 'pergunta_id'], 'uq_producao_textual_resposta');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\ProducaoTextualResposta::class);
    }
};
