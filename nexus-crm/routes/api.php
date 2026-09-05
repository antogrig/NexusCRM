<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;

// 1. ΔΗΜΟΣΙΑ ROUTES
Route::post('/login', [AuthController::class, 'login']);

// 2. ΠΡΟΣΤΑΤΕΥΜΕΝΑ ROUTES (Απαιτούν Bearer Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Όλα τα endpoints των πελατών και projects είναι πλέον κλειδωμένα!
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('tasks', TaskController::class);
});
