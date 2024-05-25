<?php

use App\Http\Controllers\CustomerCheckoutController;
use App\Http\Controllers\CustomerLapanganController;
use App\Http\Controllers\CustomerPambayaranController;
use App\Http\Controllers\CustomerPemesananController;
use App\Http\Controllers\CustomerProfileController;
use App\Http\Controllers\CustomerRiwayatPemesanan;
use App\Http\Controllers\LapanganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');


Route::as('customer.')->group(function () {
    Route::prefix('lapangan')->as('lapangan.')->group(function () {
        Route::get('/{id}', [CustomerLapanganController::class, 'show'])->name('show');
    });

    Route::prefix('pemesanan')->middleware('auth:web')->as('pemesanan.')->group(function () {
        Route::get('/', [CustomerPemesananController::class, 'index'])->name('index');
        Route::post('/', [CustomerPemesananController::class, 'store'])->name('store');
        Route::put('/{id}', [CustomerPemesananController::class, 'update'])->name('update');
        Route::delete('/{id}', [CustomerPemesananController::class, 'destroy'])->name('destroy');

        Route::prefix('checkout')->as('checkout.')->group(function () {
            Route::get('/', [CustomerCheckoutController::class, 'index'])->name('index');
        });

        Route::prefix('pembayaran')->as('pembayaran.')->group(function () {
            Route::post('/', [CustomerPambayaranController::class, 'store'])->name('store');
        });

        Route::prefix('riwayat')->as('riwayat.')->group(function () {
            Route::get('/', [CustomerRiwayatPemesanan::class, 'index'])->name('index');
        });
    });

    Route::prefix('profile')->as('profile.')->group(function () {
        Route::get('/', [CustomerProfileController::class, 'edit'])->name('edit');
        Route::put('/', [CustomerProfileController::class, 'update'])->name('update');
    });
});


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
require __DIR__ . '/api.php';
