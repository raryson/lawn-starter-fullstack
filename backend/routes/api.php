<?php

use App\Http\Controllers\SwapiController;
use App\Http\Controllers\SwapiDetailController;
use App\Http\Controllers\SwapiStatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/swapi', SwapiController::class);
Route::get('/swapi/stats', SwapiStatsController::class);
Route::get('/swapi/{resource}/{id}', SwapiDetailController::class);
