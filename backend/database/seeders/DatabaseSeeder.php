<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $sqlFiles = [
            database_path('cidades.sql'),
            database_path('grau_instrucao.sql'),
            database_path('instituicao_ensino.sql'),
        ];

        foreach ($sqlFiles as $file) {
            if (File::exists($file)) {
                DB::unprepared(file_get_contents($file));
            } else {
                $this->command->error("Arquivo não encontrado: {$file}");
            }
        }
    }
}
