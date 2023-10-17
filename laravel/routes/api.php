<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalonAuthController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\InventoryController;
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

//public client
Route::post('/registerC', [ClientAuthController::class, 'registerC']);
Route::post('/loginC', [ClientAuthController::class, 'loginC']);

//public salon
Route::post('/register', [SalonAuthController::class, 'register']);
Route::post('/login', [SalonAuthController::class, 'login']);





Route::middleware('auth:salon')->group(function () {
    Route::post('/logout', [SalonAuthController::class, 'logout']);
    Route::post('/store', [InventoryController::class, 'store']);
    Route::get('/display', [InventoryController::class, 'display']);
    Route::delete('/inventory/{id}', [InventoryController::class, 'deleteById']);
    Route::post('/inventoryy/{id}', [InventoryController::class, 'update']);
});





Route::middleware('auth:client')->group(function () {
    Route::post('/logoutC', [ClientAuthController::class, 'logoutC']);

});
