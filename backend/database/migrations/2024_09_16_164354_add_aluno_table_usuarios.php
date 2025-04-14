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
        Schema::table(\App\Models\Usuario::getTableName(), function (Blueprint $table) {
            $table->foreignId('aluno_id')->nullable()->constrained(\App\Models\Aluno::getTableName());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\Usuario::getTableName(), function (Blueprint $table) {
            $table->dropColumn('aluno_id');
        });
    }
};
