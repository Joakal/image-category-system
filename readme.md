## About Image Category System

This interfaces with the Flickr API with use of MongoDB.

There's a side task of a function that determines if a number is a sum of two cubes based on number in the URL. For example, browse towards http://localhost/paul/9

## Requirements

MongoDB 3.4.5 or higher
PHP 7.0.18 or higher
Composer 1.4.2 or higher

## Installatioin

composer update
php artisan migrate
php artisan db:seed

Note: To use the MySQL Store procedure and see result:
CALL `sumoftwo`(1729);
SELECT @result;

## License

This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Bugs

Migration issue with mongodb. The following doesn't work. Active MongoDB issue.
Schema::dropIfExists('');
https://github.com/jenssegers/laravel-mongodb/issues/1201
