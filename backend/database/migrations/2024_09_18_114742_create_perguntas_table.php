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
        Schema::create(\App\Models\Pergunta::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->text('descricao');
            $table->unsignedTinyInteger('ordem');

            $table->foreignId('genero_textual_id')->constrained(\App\Models\GeneroTextual::getTableName());
            $table->foreignId('categoria_pergunta_id')->constrained(\App\Models\CategoriaPergunta::getTableName());

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Pergunta::class);
    }
};
