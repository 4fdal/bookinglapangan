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

    public function store(Request $request)
    {

        $request->validate([
            'pemesanan_id' => ['required', 'exists:pemesanan,id'],
            'catatan_pemesanan' => ['nullable'],
            'bukti' => ['file'],
        ]);

        $file_bukti = $request->file('bukti');
        $bukti = [
            'path' => $file_bukti->store('pembayaran', 'public'),
            'originalName' => $file_bukti->getClientOriginalName(),
            'mime' => $file_bukti->getMimeType(),
            'extension' => $file_bukti->getClientOriginalExtension(),
        ];

        try {
            DB::beginTransaction();

            $pemesanan = Pemesanan::find($request->pemesanan_id);
            $pemesanan->update([
                'catatan_pemesanan' => $request->catatan_pemesanan,
                'status' => 'PROCESS',
            ]);

            Pembayaran::create([
                'pemesanan_id' => $pemesanan->id,
                'jumlah' => $pemesanan->getTotalHours(),
                'harga' => $pemesanan->lapangan->harga_per_jam,
                'total' => $pemesanan->getTotalPrice(),
                'tanggal' =>  date('Y-m-d'),
                'bukti' => json_encode($bukti),
            ]);
            DB::commit();

            return redirect()->route('customer.pemesanan.riwayat.index')->withMessage([
                'type' => 'success',
                'title' => 'Berhasil',
                'message' => 'Pembayaran berhasil kami terima, silahkan tunggu beberapa saat, hingga pemesanan anda kami konfirmasi!',
            ]);
        } catch (\Throwable $th) {

            Storage::delete($bukti['path']);

            DB::rollBack();
            throw $th;
        }
    }
}
