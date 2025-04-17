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
        $sqlFiles = File::glob(database_path('*.sql'));

        foreach ($sqlFiles as $file) {
            $this->command->info("Importando: {$file}");
            DB::unprepared(file_get_contents($file));
        }
    }
}
