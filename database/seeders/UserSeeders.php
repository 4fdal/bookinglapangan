<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('qwerty123')
        ])->assignRole('admin');

        User::create([
            'name' => 'Customer',
            'email' => 'customer@customer.com',
            'password' => Hash::make('qwerty123')
        ])->assignRole('customer');
    }
}
