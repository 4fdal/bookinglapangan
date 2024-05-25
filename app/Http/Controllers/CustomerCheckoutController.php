<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerCheckoutController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $pemesanan = Pemesanan::with(['user', 'lapangan'])->where('user_id', $user_id)->get();

        return Inertia::render('Customer/Pemesanan/Checkout/Index', [
            'items' => $pemesanan,
            'rekening_penerima' => [
                'bank' => env('NAMA_REKENING_PENERIMA'),
                'nomor' => env('NOMOR_REKENING_PENERIMA'),
                'pemilik' => env('NAMA_PEMILIK_REKENING_PENERIMA'),
            ]
        ]);
    }
}
