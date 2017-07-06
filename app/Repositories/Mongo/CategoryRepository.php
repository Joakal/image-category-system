<?php

namespace App\Repositories\Mongo;

use App\Repositories\CategoryInterface;
use App\Category;

class CategoryRepository implements CategoryInterface
{

    public function all()
    {
        return Category::all();
    }

    public function create($request)
    {
        $category = new Category;

        $category->name = $request->name;

        return $category->save();
    }

    public function update($request, $id)
    {
        $category = Category::find($id);

        $category->name = $request->name;

        return $category->save();
    }

    public function delete($id)
    {
        $category = Category::find($id);

        return $category->delete();
    }
}
