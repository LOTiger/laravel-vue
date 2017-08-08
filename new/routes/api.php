<?php

use Illuminate\Http\Request;
use App\User;

Route::get('test', function () {
    return response([1,2,3,4],200);
});
Route::middleware('auth:api')->get('/user', function (Request $request) {

    return User::all()->first();
});
