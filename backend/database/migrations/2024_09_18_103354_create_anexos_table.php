<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create(\App\Models\Anexo::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('arquivo');
            $table->integer('relacionado_id');
            $table->string('relacionado_model');
            $table->index(['relacionado_id', 'relacionado_model'], 'idx_anexo_relacionado');
            $table->unsignedTinyInteger('tipo');
            $table->foreignId('usuario_id')->constrained(\App\Models\Usuario::getTableName());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(\App\Models\Anexo::getTableName());
    }
};
