<?php

use Illuminate\Database\Seeder;
use Jenssegers\Mongodb\Eloquent\Model;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
        ['name' => 'Cats'],
        ['name' => 'Dogs'],
        ['name' => 'Flowers'],
        ['name' => 'Trees'],
        ['name' => 'Men'],
        ['name' => 'Women'],
        ['name' => 'Boys'],
        ['name' => 'Girls']

      ]);
    }
}
