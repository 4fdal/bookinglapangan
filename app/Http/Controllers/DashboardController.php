<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pemesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $pembayaran_paid = Pembayaran::where('status', Pembayaran::STATUS_PAID)->get();

        $pelanggan = User::role(User::ROLE_CUSTOMER)->count();
        $pemesanan = Pemesanan::where('status', Pemesanan::STATUS_PROCESS)->count();
        $pembayaran = $pembayaran_paid->count();
        $keuntungan = $pembayaran_paid->sum('total');


        $pembayaran_paid_month_group = $pembayaran_paid->map(function ($item) {
            $item->month = Carbon::parse($item->updated_at)->locale('id');
            $item->month->settings(['formatFunction' => 'translatedFormat']);
            $item->month = $item->month->format('M');

            return $item;
        })->groupBy('month');

        $grafik_keuntungan = [];
        foreach ($pembayaran_paid_month_group as $key => $pembayaran_paid_month_items) {
            $grafik_keuntungan[$key] = $pembayaran_paid_month_items->sum('total');
        }


        return Inertia::render('Dashboard', compact('pelanggan', 'pemesanan', 'pembayaran', 'keuntungan', 'grafik_keuntungan'));
    }
}
