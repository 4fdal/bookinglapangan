<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class CustomerLapanganController extends Controller
{
    public function show($id)
    {

        $lapangan = Lapangan::find($id);
        if (!$lapangan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data lapangan tidak ditemukan'
        ]);

        return Inertia::render('Customer/Lapangan/Show', [
            'item' => $lapangan,
        ]);
    }

    public function schedule(Request $request, $id)
    {
        $except_id = $request->get('except_id', null);
        $date_now = Carbon::now()->format('Y-m-d');

        $pemesanan = Pemesanan::where('tanggal_booking', '>=', $date_now)
            ->where('status', Pemesanan::STATUS_PROCESS)
            ->where('lapangan_id', $id);

        if ($except_id != null) {
            $pemesanan = $pemesanan->whereNotIn('id', [$except_id]);
        }

        $pemesanan = $pemesanan->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'start' => "{$item->tanggal_booking} {$item->waktu_mulai}",
                    'end' => "{$item->tanggal_booking} {$item->waktu_selesai}",
                    'title' => $item->user->name,
                ];
            });

        return response()->json([
            'message' => 'Daftar waktu pemesan pada lapangan',
            'data' => $pemesanan,
            'errors' => null,
        ]);
    }
}
