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
            $table->unsignedTinyInteger('status')->default(\App\Models\ProducaoTextual::ST_NAO_INICIADO);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\ProducaoTextual::getTableName(), function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
