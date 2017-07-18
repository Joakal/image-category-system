<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\CategoryInterface;
use App\Repositories\Mongo\CategoryRepository;
use App\Repositories\APIInterface;
use App\Repositories\Flickr\APIRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(CategoryInterface::class, CategoryRepository::class);
        $this->app->singleton(APIInterface::class, APIRepository::class);
    }
}
