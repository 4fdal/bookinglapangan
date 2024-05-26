<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerRiwayatPemesanan extends Controller
{
    public function index()
    {

        $user_id = Auth::user()->id;

        $pembayaran = Pembayaran::with(['user', 'detail' => function ($detail_pembayaran) {
            return $detail_pembayaran->with(['lapangan']);
        }])
            ->where('user_id', $user_id)
            ->orderByDesc('created_at')
            ->get();


        return Inertia::render('Customer/Pemesanan/Riwayat/Index', [
            'items' => $pembayaran,
            'rekening_penerima' => [
                'bank' => env('NAMA_REKENING_PENERIMA'),
                'nomor' => env('NOMOR_REKENING_PENERIMA'),
                'pemilik' => env('NAMA_PEMILIK_REKENING_PENERIMA'),
            ]
        ]);
    }
}
