<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('sumoftwo', function (Blueprint $table) {
        //     $table->string('number');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Migration issue here with mongodb.
        // Schema::dropIfExists('');
        // https://github.com/jenssegers/laravel-mongodb/issues/1201
        Schema::drop('sumoftwo');
    }
}
