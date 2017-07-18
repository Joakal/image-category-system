## About Image Category System

This interfaces with the Flickr API with use of MongoDB.

## Requirements

MongoDB 3.4.5 or higher
PHP 7.0.18 or higher
Composer 1.4.2 or higher

## Installatioin

composer update
php artisan migrate
php artisan db:seed

## License

This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Bugs

Migration issue with mongodb. The following doesn't work. Active MongoDB issue.
Schema::dropIfExists('');
https://github.com/jenssegers/laravel-mongodb/issues/1201
