<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@nexus.cy'],
            [
                'name'     => 'Demo Admin',
                'password' => 'admin', // Το Laravel 11 θα το κάνει hash μόνο του!
                'role'     => 'admin',
            ]
        );
    }
}
