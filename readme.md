## About Image Category System

A website that interfaces with the Flickr API with use of MongoDB.

## Requirements

Docker 17.06 or higher

## Installation

docker-compose up -d
docker-compose exec php php artisan db:seed

Navigate to http://localhost:8080/

## Usage

As user, click a category to see up to 9 images from Flickr and can view the details for each image.

As admin,
- you can login as admin. Email: admin@example.com Password: @nyth!ng
- you can create, update or delete category names

## License

This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Bugs

Migration issue with mongodb. The following doesn't work. Active MongoDB issue.
Schema::dropIfExists('');
https://github.com/jenssegers/laravel-mongodb/issues/1201
