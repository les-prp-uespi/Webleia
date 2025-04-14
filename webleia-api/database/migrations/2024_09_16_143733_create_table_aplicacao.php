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
        Schema::create(\App\Models\Aplicacao::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('identificador');
            $table->string('codigo')->unique();
            $table->unsignedTinyInteger('tipo');
            $table->unsignedTinyInteger('versao');
            $table->unsignedTinyInteger('seguranca');
            $table->string('firebase')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Aplicacao::getTableName());
    }
};
