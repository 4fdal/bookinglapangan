<?php

use App\Http\Controllers\CustomerLapanganController;

use Illuminate\Support\Facades\Route;

Route::prefix('api')->as('api.')->group(function () {

    Route::prefix('lapangan')->as('lapangan.')->group(function () {
        Route::get('/{id}/schedule', [CustomerLapanganController::class, 'schedule'])->name('schedule');
    });
});
