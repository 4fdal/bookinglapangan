<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerPemesananController extends Controller
{
    private function getCookiePemesanan()
    {
        $cookie_pemesanan = cookie('pemesanan')->getValue();
        $cookie_pemesanan = $cookie_pemesanan ? unserialize($cookie_pemesanan) : [];

        return $cookie_pemesanan;
    }

    public function index()
    {
        $user_id = Auth::user()->id ?? null;
        if ($user_id) {
            $items = $this->getCookiePemesanan();
        } else {
            $items = Pemesanan::where('user_id', $user_id)->get()->toArray();
        }

        return Inertia::render('Customer/Pemesanan/Index', compact('items'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'lapangan_id' => ['required', 'exists:lapangan,id'],
            'waktu_mulai' => ['required', 'date_format:Y-m-d H:i:s'],
            'waktu_selesai' => ['required', 'date_format:Y-m-d H:i:s'],
        ]);


        try {
            DB::beginTransaction();

            $user_id = Auth::user()->id ?? null;
            $lapangan_id = $request->lapangan_id;
            $tanggal_booking = Carbon::parse($request->waktu_mulai)->format('Y-m-d');
            $waktu_mulai = Carbon::parse($request->waktu_mulai)->format('H:i:s');
            $waktu_selesai = Carbon::parse($request->waktu_selesai)->format('H:i:s');
            $created_at = date('Y-m-d H:i:s');
            $updated_at = $created_at;

            $data_create = compact('user_id', 'lapangan_id', 'tanggal_booking', 'waktu_mulai', 'waktu_selesai', 'created_at', 'updated_at');
            $pemesanan = Pemesanan::create($data_create);

            DB::commit();

            $cookie_pemesanan = $this->getCookiePemesanan();
            $cookie_pemesanan[] = $pemesanan;
            cookie('pemesanan', serialize($cookie_pemesanan));

            return redirect()->route('customer.pemesanan.index')->withMessage([
                'type' => 'success',
                'title' => 'Berhasil',
                'message' => 'Pemesanan baru berhasil dibuat, segera lakukan pembayaran!'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
