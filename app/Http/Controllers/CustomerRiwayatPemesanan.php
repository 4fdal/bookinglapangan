<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerRiwayatPemesanan extends Controller
{
    public function index()
    {
        return Inertia::render('Customer/Pemesanan/Riwayat/Index');
    }
}
