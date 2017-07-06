<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\APIInterface as APIRepository;

class APIController extends Controller
{

    /**
     * @var $api
     */
    private $api;

    /**
     * APIController constructor.
     *
     * @param App\Repositories\APIRepository $api
     */
    public function __construct(APIRepository $api)
    {
        $this->api = $api;
    }

    /**
     * Display a list of images based on category.
     *
     * @param  string $search
     * @return \Illuminate\Http\JsonResponse
     */
    public function getImages($search)
    {
        return $this->api->search($search);
    }


    /**
     * Display a image based on id.
     *
     * @param  integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getImage($id)
    {
        return $this->api->find($id);
    }
}
