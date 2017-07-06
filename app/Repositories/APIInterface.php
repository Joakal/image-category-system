<?php

namespace App\Repositories;

interface APIInterface
{

    public function search($search);

    public function find($id);
}
