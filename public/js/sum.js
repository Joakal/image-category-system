
/*
* z = x^3 + y^3
* Two ways, one is brute force by going through all possible x and y combinations of which x and y numbers add up to cube root of sum.
* Second is go through x only, and after subtracting from sum, determine if the result is a cube root. ie y^3 = z - x^3. We'll go with that as it's less code
*/
function sumOfTwo(sum){

  var cube_root = Math.floor( Math.pow( sum, 1/3 ) );
  var y_cube;
  var y;

      // Start at 1 up until the cube root of the sum
      // Get the leftover amount after taking away a cubed number
      // Get the cube root of the potential number and then check if it's an integer
      for(var i = 1; i <= cube_root; i++){

        y_cube = sum - Math.pow(i,3);

        y = Math.pow( y_cube, 1/3 );

        if( Number.isInteger(y) ){
            return true;
        };

      } // end for cube root loop

}


$(function() {
  // Get number from last URL part
  var lastPart = window.location.href.split("/").pop();
  if( sumOfTwo(lastPart) )
  {
    $( ".paul-js" ).text( "JS sum check: True" );
  }else{
    $( ".paul-js" ).text( "JS sum check: False" );
  }


});
