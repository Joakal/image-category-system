<?php

use Illuminate\Database\Seeder;
use Jenssegers\Mongodb\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
        [
          'email' => 'admin@example.com',
          'password' => Hash::make('@nyth!ng'),
          'api_token' => str_random(60)
        ],
        [
          'email' => 'user@example.com',
          'password' => Hash::make('password1'),
          'api_token' => str_random(60)
        ],
      ]);
    }
}
