<?php

namespace App\Repositories;

interface CategoryInterface {

  public function all();

  public function create($request);

  public function update($request, $id);

  public function delete($id);

}
