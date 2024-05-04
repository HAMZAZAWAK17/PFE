<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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

Route::middleware('verifyAuth')->group(function () {
    // return $request->user();
    return response()->json(['valid' => auth()->check()]);
});

// ---------------------------- Auth ----------------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --------------------- Single User Infos ----------------------
Route::get('/user-details', [AuthController::class, 'userDetails']);
Route::get('/user/orders', [AuthController::class, 'getUserOrders']);
Route::get('/user/reservations', [AuthController::class, 'getUserReservations']);

// ---------------------------- Pets ----------------------------
Route::get('/petlist', [PetController::class, 'index']);
Route::get('/edit-pet/{id}', [PetController::class, 'edit']);
Route::put('/update-pet/{id}', [PetController::class, 'update']);
Route::delete('/delete-pet/{id}', [PetController::class, 'destroy']);
Route::post('/store-pet', [PetController::class, 'store']);
Route::get('/filter-pets', [PetController::class, 'filterAnimals']);
Route::get('/details-pets/{id}', [PetController::class, 'show']);

// ---------------------------- Users ----------------------------
Route::get('/users-list', [UserController::class, 'index']);
Route::get('/details-user/{id}', [UserController::class, 'show']);
Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);

// ------------------ ---------- Team ----------------------------
Route::get('/team-list', [TeamController::class, 'index']);
Route::post('/add-member', [TeamController::class, 'store']);
Route::get('details-member/{id}', [TeamController::class, 'show']);
Route::delete('/delete-member/{id}', [TeamController::class, 'destroy']);

// ---------------------------- Orders ----------------------------
Route::get('/orders-list', [OrderController::class, 'index']);
Route::delete('/delete-order/{id}', [OrderController::class, 'destroy']);
Route::put('/accept-order/{id}', [OrderController::class, 'acceptOrder']);
Route::put('/refuse-order/{id}', [OrderController::class, 'refuseOrder']);
Route::put('/reset-order/{id}', [OrderController::class, 'reset']);
Route::post('/make-order', [OrderController::class, 'store']);
Route::get('/details-order/{id}', [OrderController::class, 'show']);

// ---------------------------- Hotel ----------------------------
Route::get('/reservation-list', [ReservationController::class, 'index']);
Route::post('/make-reservation', [ReservationController::class, 'store']);
Route::get('/details-reservation/{id}', [ReservationController::class, 'show']);
Route::delete('/delete-reservation/{id}', [ReservationController::class, 'destroy']);
Route::put('/accept-reservation/{id}', [ReservationController::class, 'AcceptReservation']);
Route::put('/refuse-reservation/{id}', [ReservationController::class, 'refuseReservation']);
Route::put('/reset-reservation/{id}', [ReservationController::class, 'reset']);

// ---------------------------- Dashboard ----------------------------
Route::get('/pet-count', [DashboardController::class, 'getPetCount']);
Route::get('/user-count', [DashboardController::class, 'getUserCount']);
Route::get('/team-count', [DashboardController::class, 'getTeamCount']);
Route::get('/reservation-total', [DashboardController::class, 'getReservationTotalPrice']);
Route::get('/average-reservation-duration', [DashboardController::class, 'getAvgDuration']);
Route::get('/order-count', [DashboardController::class, 'getOrderTotal']);
