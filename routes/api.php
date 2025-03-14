<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

Route::middleware(['throttle:api'])->group(function () {

    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/refresh-token', [AuthController::class, 'refreshToken']);
    // Route::get('mail', [AuthController::class, 'sendNotifyEmail']);

    Route::middleware('auth:api', 'scope:superadmin,admin,branchadmin')->group(function () {
        
        Route::post('auth/me', [AuthController::class, 'me']);
        Route::post('auth/logout', [AuthController::class, 'logout']);

    });
});