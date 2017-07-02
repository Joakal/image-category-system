<?php

namespace App\Http\Controllers;

use App\Sumoftwo;
use Illuminate\Http\Request;

class PaulController extends Controller
{
    /**
     * Check if a number is a sum of two cubes through different ways
     *
     * @param  int  $sum
     * @return \Illuminate\Http\Response
     */
    public function index($sum)
    {
        $result = [
          'php' => false,
          'mongos' => [],
          'mysql' => false
        ];

        // z = x^3 + y^3
        // Two ways, one is brute force by going through all possible x and y combinations of which x and y numbers add up to cube root of sum.
        // Second is go through x only, and after subtracting from sum, determine if the result is a cube root. ie y^3 = z - x^3. We'll go with that as it's less code

        // PHP
        if( $this->__sumOfTwo( $sum ) ){
            $result['php'] = true;
        }

        // MONGO
        $mongos = Sumoftwo::all();
        foreach($mongos as $key => $mongo){
          $mongos[$key]->result = $this->__sumOfTwo($mongo->number);
        }
        $result['mongos'] = $mongos;

        // MYSQL
        $users = DB::connection('mysql')->select();

        return view('paul', $result);
    }

    /**
     * Display true or false that a number is a sum of two cubes.
     *
     * @param  int  $sum
     * @return boolean $result
     */
    private function __sumOfTwo($sum)
    {

      $cube_root = floor( pow($sum, 1/3) );

      // Start at 1 up until the cube root of the sum
      // Get the leftover amount after taking away a cubed number
      // Get the cube root of the potential number and then check if it's an integer
      for( $i = 0; $i <= $cube_root; $i++ ){

        $y_cube = $sum - pow($i,3);

        // Evaluate into string from integer or float
        // This is because PHP will evaluate is_int( $y ) as false if $y = 5 and $y is a float
        $y = strval( pow($y_cube, 1/3) );

        // Check for whole number
        if( ctype_digit($y) ){
            return true;

        }

      } // end for cube root loop

    }

}
