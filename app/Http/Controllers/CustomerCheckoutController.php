<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerCheckoutController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;
        $pemesanan = Pemesanan::with(['user', 'lapangan'])->where('user_id', $user_id)->get();

        return Inertia::render('Customer/Pemesanan/Checkout/Index', [
            'items' => $pemesanan,
        ]);
    }
}
