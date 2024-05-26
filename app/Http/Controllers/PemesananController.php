<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PemesananController extends Controller
{
    public function index(Request $request)
    {
        $per_page = 15;

        if ($request->pelanggan != null || $request->lapangan_id != null) {
            $per_page = Pembayaran::count();
        }

        $pembayaran = Pembayaran::with(['user' => function ($user) use ($request) {
            return $user->with(['pelanggan']);
        }, 'detail' => function ($detail) use ($request) {
            return $detail->with(['lapangan']);
        }])
            ->where('tanggal', ">=", date('Y-m-d'))
            ->orderByDesc('tanggal');

        $pembayaran = $pembayaran->paginate($per_page)->toArray();

        if ($request->pelanggan != null || $request->lapangan_id != null) {
            $pembayaran['data'] = collect($pembayaran['data'])->filter(function ($pembayaran) use ($request) {

                $lapangan = true;
                $pelanggan = true;

                if ($request->pelanggan) {

                    $pelanggan =  is_integer(strpos(strtolower($pembayaran['user']['name']), strtolower($request->pelanggan)));
                }

                if ($request->lapangan_id) {
                    $lapangan = collect($pembayaran['detail'])->filter(function ($detail) use ($request) {
                        return $detail['lapangan_id'] == $request->lapangan_id;
                    })->count() > 0;
                }

                return $lapangan && $pelanggan;
            });
        }

        $lapangan = Lapangan::orderByDesc('created_at')->get();

        return Inertia::render("Pemesanan/Index", [
            'data' => $pembayaran,
            'lapangan_items' => $lapangan,
        ]);
    }

    public function update(Request $request, $pembayaran_id)
    {

        $pembayaran = Pembayaran::find($pembayaran_id);

        $request->validate([
            'status' => ['required', Rule::in([Pembayaran::STATUS_PAID, Pembayaran::STATUS_PAYMENT, Pembayaran::STATUS_PENDING])]
        ]);



        try {
            DB::beginTransaction();

            $pembayaran->status = $request->status;
            $pembayaran->save();

            DB::commit();


            $nama_pelanggan = $pembayaran->user->name;

            if ($pembayaran->status == Pembayaran::STATUS_PAID) {
                return redirect()->back()->withMessage([
                    'type' => 'success',
                    'title' => 'Berhasil',
                    'message' => "Pembayaran pelanggan {$nama_pelanggan} telah berhasil dikonfirmasi",
                ]);
            } else {
                return redirect()->back()->withMessage([
                    'type' => 'warning',
                    'title' => 'Berhasil',
                    'message' => "Pembayaran pelanggan {$nama_pelanggan} telah berhasil dibatalkan",
                ]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
