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
        Schema::create(\App\Models\ProducaoTextual::getTableName(), function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 500);
            $table->text('texto')->nullable();
            $table->foreignId('genero_textual_id')->constrained(\App\Models\GeneroTextual::getTableName());
            $table->foreignId('usuario_id')->constrained(\App\Models\Usuario::getTableName());
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\ProducaoTextual::class);
    }
};
