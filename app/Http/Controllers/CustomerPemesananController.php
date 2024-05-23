<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CustomerPemesananController extends Controller
{

    public function index(Request $request)
    {
        $user_id = Auth::user()->id ?? null;
        $items = Pemesanan::with(['user', 'lapangan'])
            ->where('user_id', $user_id)
            ->get();

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
            Pemesanan::create($data_create);

            DB::commit();

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

    public function update(Request $request, $id)
    {
        $pemesanan = Pemesanan::find($id);
        if (!$pemesanan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data pemesanan tidak ditemukan'
        ]);

        $lapangan = $pemesanan->lapangan;

        $request->validate([
            'waktu_mulai' => ['required', 'date_format:Y-m-d H:i:s'],
            'waktu_selesai' => ['required', 'date_format:Y-m-d H:i:s'],
        ]);

        try {
            DB::beginTransaction();

            $tanggal_booking = Carbon::parse($request->waktu_mulai)->format('Y-m-d');
            $waktu_mulai = Carbon::parse($request->waktu_mulai)->format('H:i:s');
            $waktu_selesai = Carbon::parse($request->waktu_selesai)->format('H:i:s');
            $created_at = date('Y-m-d H:i:s');
            $updated_at = $created_at;

            $data_update = compact('tanggal_booking', 'waktu_mulai', 'waktu_selesai', 'created_at', 'updated_at');

            $pemesanan->update($data_update);

            DB::commit();

            return redirect()
                ->route('customer.pemesanan.index')
                ->withMessage([
                    'type' => 'success',
                    'title' => 'Berhasil',
                    'message' => "Waktu pemesanan {$lapangan->nama} berhasil diubah"
                ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function destroy($id)
    {

        $pemesanan = Pemesanan::find($id);
        if (!$pemesanan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data pemesanan tidak ditemukan'
        ]);

        $nama_lapangan = $pemesanan->lapangan->nama;
        $pemesanan->delete();


        return redirect()->back()->withMessage([
            'type' => 'success',
            'title' => 'Berhasil',
            'message' => 'Pemesanan ' . $nama_lapangan . ' berhasil dihapus',
        ]);
    }
}
