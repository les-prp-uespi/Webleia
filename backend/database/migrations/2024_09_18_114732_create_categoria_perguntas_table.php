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
        Schema::create(\App\Models\CategoriaPergunta::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->text('descricao');
            $table->unsignedTinyInteger('ordem');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\CategoriaPergunta::getTableName());
    }
};
