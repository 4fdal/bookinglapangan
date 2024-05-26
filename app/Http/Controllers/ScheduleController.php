<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $pemesanan = Pemesanan::with(['lapangan'])->where('status', Pemesanan::STATUS_PROCESS);

        if (isset($request->lapangan_id)) {
            $pemesanan = $pemesanan->where('lapangan_id', $request->lapangan_id);
        }

        $pemesanan = $pemesanan->get()
            ->map(function ($pemesanan) {

                $tanggal_booking = $pemesanan->tanggal_booking;

                $id = $pemesanan->id;
                $title = $pemesanan->lapangan->nama;
                $start = "{$tanggal_booking} {$pemesanan->waktu_mulai}";
                $end = "{$tanggal_booking} {$pemesanan->waktu_selesai}";

                return compact('id', 'title', 'start', 'end');
            });

        $lapangan = Lapangan::get();

        return Inertia::render('Schedule/Index', [
            'data' => $pemesanan,
            'lapangan_items' => $lapangan,
        ]);
    }
}
