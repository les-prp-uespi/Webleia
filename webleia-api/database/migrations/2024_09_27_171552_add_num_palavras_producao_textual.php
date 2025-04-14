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
        Schema::table(\App\Models\ProducaoTextual::getTableName(), function (Blueprint $table) {
            $table->unsignedSmallInteger('num_palavras')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\ProducaoTextual::getTableName(), function (Blueprint $table) {
            $table->dropColumn('num_palavras');
        });
    }
};
