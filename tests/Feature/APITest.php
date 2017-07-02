<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use App\Repositories\CategoryInterface;
use Mockery as m;

class APITest extends TestCase
{
    private $categoryRepository;

    public function setUp()
    {
        parent::setUp();
        $this->categoryRepository = m::mock('App\Repositories\CategoryInterface');
        $this->app->instance('App\Repositories\CategoryInterface', $this->categoryRepository);
    }

    public function tearDown()
    {
        m::close();
        parent::tearDown();
    }

      /**
       * Test that we can get a category list
       *
       * @return void
       */
      public function testGetCategoryList()
      {
          $this->categoryRepository
              ->shouldReceive('all')
              ->once()
              ->andReturn(json_encode(['name' => 'Dogs']));

          $response = $this->json('GET', '/api/v1/categories');

          $response
              ->assertStatus(200)
              ->assertJsonFragment(
                  ['name' => 'Dogs']
              );
      }

            /**
             * Update a category successfully
             *
             * @return void
             */
            public function testUpdateCategory()
            {
              $category = factory(\App\Category::class)->make();

                $this->categoryRepository
                    ->shouldReceive('update')
                    ->once()
                    ->andReturn(json_encode(['success' => true]));

                $api_url = '/api/v1/categories/' . $category->_id;
                $input = ['name' => 'Big dogs'];

                $response = $this->json('PUT', $api_url, $input);

                $response
                    ->assertStatus(200)
                    ->assertJsonFragment(
                        ['success' => true]
                    );
            }

                  /**
                   * Create a category successfully
                   *
                   * @return void
                   */
                  public function testCreateCategory()
                  {

                      $this->categoryRepository
                          ->shouldReceive('create')
                          ->once()
                          ->andReturn(json_encode(['success' => true]));

                      $api_url = '/api/v1/categories/';
                      $input = ['name' => 'Big cats'];

                      $response = $this->json('POST', $api_url, $input);

                      $response
                          ->assertStatus(200)
                          ->assertJsonFragment(
                              ['success' => true]
                          );
                  }

            /**
             * Delete a category successfully
             *
             * @return void
             */
            public function testDeleteCategory()
            {

                $category = factory(\App\Category::class)->make();

                $this->categoryRepository
                    ->shouldReceive('delete')
                    ->once()
                    ->andReturn(json_encode(['success' => true]));

                $api_url = '/api/v1/categories/' . $category->_id;

                $response = $this->json('DELETE', $api_url);

                $response
                    ->assertStatus(200)
                    ->assertJsonFragment(
                        ['success' => true]
                    );
            }

}
