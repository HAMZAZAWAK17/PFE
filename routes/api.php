<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Models\Order;
use App\Models\pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    // return $request->user();
    return response()->json([ 'valid' => auth()->check() ]);
});


// ---------------------------- Pets ----------------------------
Route::get('/petlist',[PetController::class,'index']);
Route::post('/store-pet',[PetController::class,'store']);
Route::get('/details-pets/{id}', [PetController::class, 'show']);
Route::get('/edit-pet/{id}', [PetController::class, 'edit']);
Route::put('/update-pet/{id}',[PetController::class,'update']);
Route::delete('/delete-pet/{id}',[PetController::class,'destroy']);
Route::get('/filter-pets',[PetController::class,'filterAnimals']);

// ---------------------------- Users ----------------------------
Route::get('/users-list',[UserController::class,'index']);
Route::get('/details-user/{id}', [UserController::class, 'show']);
Route::delete('/delete-user/{id}',[UserController::class,'destroy']);

// ---------------------------- Orders ----------------------------
Route::get('/orders-list',[OrderController::class,'index']);
Route::post('/make-order',[OrderController::class,'store']);
Route::get('/details-order/{id}',[OrderController::class,'show']);
Route::delete('/delete-order/{id}',[OrderController::class,'destroy']);
Route::put('/accept-order/{id}',[OrderController::class,'acceptOrder']);
Route::put('/refuse-order/{id}',[OrderController::class,'refuseOrder']);
Route::put('/reset-order/{id}',[OrderController::class,'reset']);
// Route::get('/filter-orders',[OrderController::class,'filterOrders']);

// ---------------------------- Team ----------------------------
Route::get('/team-list',[TeamController::class,'index']);
Route::post('/add-member',[TeamController::class,'store']);
Route::delete('/delete-member/{id}',[TeamController::class,'destroy']);


// ---------------------------- Auth ----------------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('user-detail', [AuthController::class, 'userDetails']);