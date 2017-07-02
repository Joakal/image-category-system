CREATE PROCEDURE `sumoftwo`(IN numb INT)
BEGIN
    DECLARE cubeRoot FLOAT;
    DECLARE yCube DOUBLE;
    DECLARE y DOUBLE;
    DECLARE i INT;

    SET cubeRoot = FLOOR(POW(numb, 1/3));
    SET i = 1;
	  SET @result = FALSE;

      # Start at 1 up until the cube root of the sum
      # Get the leftover amount after taking away a cubed number
      # Get the cube root of the potential number and then check if it's an integer
	  label1: LOOP
		SET yCube = numb - POW(i, 3);

		SET y = POW(yCube, 1/3);

		IF CEIL(y) = y THEN
	    SET @result = TRUE;
		  LEAVE label1;
    ELSEIF i < cubeRoot THEN
		  SET i = i + 1;
		  ITERATE label1;
		END IF;

		LEAVE label1;

	  END LOOP label1;

END
