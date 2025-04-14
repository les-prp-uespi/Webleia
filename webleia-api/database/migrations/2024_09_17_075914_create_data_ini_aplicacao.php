<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \Illuminate\Support\Facades\DB::table(\App\Models\Aplicacao::getTableName())->insert([
            [
                'nome' => 'dashboard',
                'identificador' => 'dashboard',
                'codigo' => 'W3L3A',
                'tipo' => 1,
                'versao' => 1,
                'seguranca' => 1,
                'created_at' => now(),
                'updated_at' => now()
                ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
