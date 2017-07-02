<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use App\Repositories\APIInterface;
use Mockery as m;

class FlickrTest extends TestCase
{
    private $apiRepository;

    public function setUp()
    {
        parent::setUp();
        $this->apiRepository = m::mock('App\Repositories\APIInterface');
        $this->app->instance('App\Repositories\APIInterface', $this->apiRepository);
    }

    public function tearDown()
    {
        m::close();
        parent:
    }

      /**
      * Search a category successfully
      *
      * @return void
      */
      public function testAPISearch()
      {
        $faker = \Faker\Factory::create();

        $search = $faker->name;

          $this->apiRepository
        ->shouldReceive('search')
        ->once()
        ->andReturn(json_encode(['stat' => 'ok']));

          $api_url = '/api/v1/getCategoryImages/' . $search;

          $response = $this->json('GET', $api_url);

          $response
        ->assertStatus(200)
        ->assertJsonFragment(
            ['stat' => 'ok']
        );
      }

        /**
        * Find an image successfully
        *
        * @return void
        */
        public function testAPIFind()
        {
          $faker = \Faker\Factory::create();

          $id = $faker->md5;

            $this->apiRepository
          ->shouldReceive('find')
          ->once()
          ->andReturn(json_encode(['stat' => 'ok']));

            $api_url = '/api/v1/getImage/' . $id;

            $response = $this->json('GET', $api_url);

            $response
          ->assertStatus(200)
          ->assertJsonFragment(
              ['stat' => 'ok']
          );
        }
}
