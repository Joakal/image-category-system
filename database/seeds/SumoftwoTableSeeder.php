<?php

use Illuminate\Database\Seeder;

class SumoftwoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('sumoftwo')->insert([
        ['number' => 1 ],
        ['number' => 4 ],
        ['number' => 8 ],
        ['number' => 9 ],
        [ 'number' => 10 ],
        [ 'number' => 91 ],
        [ 'number' => 1729 ]
      ]);
    }
}
