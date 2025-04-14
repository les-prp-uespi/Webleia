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
        \Illuminate\Support\Facades\DB::table(\App\Models\Usuario::getTableName())->insert([
            ['nome' => 'Magno Leal', 'email' => 'magnoleal89@gmail.com', 'perfil' => \App\Config\Constantes::PERFIL_ADMIN,
                'senha' => Hash::make('123456'), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
