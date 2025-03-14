<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;







class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if(env('DB_CONNECTION') != 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        
        
        if(env('DB_CONNECTION') != 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
        
        $this->call([
            UserSeeder::class,
        ]);
    }
}
