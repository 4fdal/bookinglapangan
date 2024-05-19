<?php

use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', []);
})->name('welcome');



Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('lapangan')->as('lapangan.')->group(function () {
        Route::get('/', [LapanganController::class, 'index'])->name('index');
        Route::get('/create', [LapanganController::class, 'create'])->name('create');
        Route::post('/store', [LapanganController::class, 'store'])->name('store');

        Route::get('/{id}', [LapanganController::class, 'show'])->name('show');
        Route::get('/{id}/edit', [LapanganController::class, 'edit'])->name('edit');
        Route::post('/{id}/update', [LapanganController::class, 'update'])->name('update');

        Route::delete('/{id}/destroy', [LapanganController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__ . '/auth.php';
