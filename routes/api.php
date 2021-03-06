<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(
    ['prefix' => 'v1'], function () {

        Route::resource('categories', 'CategoryController', ['only' => ['index']]);
        Route::middleware('auth:api')->resource('categories', 'CategoryController', ['except' => ['index']]);

        Route::get('getCategoryImages/{category}', 'APIController@getImages')->name('categoryImages');
        Route::get('getImage/{id}', 'APIController@getImage')->name('getImage');

    }
);
