<?php

namespace App\Repositories\Flickr;

use Flickr;
use App\Repositories\APIInterface;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class APIRepository implements APIInterface
{
    public function search($search)
    {
        $arrayOfParameters = [
        'method' => 'flickr.photos.search',
        'tags' => $search,
        'format' => 'json',
        'api_key' => env('FLICKR_KEY'),
        'per_page' => 9,
        'nojsoncallback' => 1
        ];
        $results = $this->__callFlickAPI($arrayOfParameters);

        return $results;
    }


    public function find($id)
    {
        $arrayOfParameters = [
                'method' => 'flickr.photos.getInfo',
                'photo_id' => $id,
                'format' => 'json',
                'api_key' => env('FLICKR_KEY'),
                'nojsoncallback' => 1
              ];
        $results = $this->__callFlickAPI($arrayOfParameters);

        return $results;
    }

    /**
     * Call the Flickr API based.
     * @param  array  $method
     * @param  array  $arrayOfParameters
     * @return \Illuminate\Http\JsonResponse
     */
    public function __callFlickAPI($arrayOfParameters)
    {

      // Lets use Guzzle!
        $client = new Client();
        //
        $response = $client->request(
            'GET',
            // Base URI is used with relative requests
            'https://api.flickr.com/services/rest/',
            // You can set any number of default request options.
            ['query' => $arrayOfParameters]
        );

        return (string) $response->getBody();
    }
}
