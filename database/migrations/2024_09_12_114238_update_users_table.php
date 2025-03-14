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
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique();

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();

            $table->foreignId("branch_id")->nullable();
            
            // $table->enum('role', ["superadmin", "admin", "customer", "branchadmin"]);

            // \DB::statement("ALTER TABLE users MODIFY role ENUM('superadmin', 'admin', 'branchadmin', 'customer') NOT NULL");
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 
        });
    }
};
