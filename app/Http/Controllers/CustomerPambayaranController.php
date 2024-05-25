<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CustomerPambayaranController extends Controller
{
    public function store(Request $request)
    {

        $user_id = Auth::user()->id;

        $request->validate([
            'pemesanan_ids.*' => ['required', 'exists:pemesanan,id'],
            'catatan_pemesanan' => ['nullable'],
            'bukti' => ['required', 'file'],
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

            $pembayaran = Pembayaran::create([
                'user_id' => $user_id,
                'subtotal' => 0,
                'total' => 0,
                'tanggal' =>  date('Y-m-d'),
                'bukti' => json_encode($bukti),
                'status' => Pembayaran::STATUS_PAYMENT,
                'catatan_pemesanan' => $request->catatan_pemesanan,
            ]);

            Pemesanan::whereIn('id', $request->pemesanan_ids)
                ->where('status', Pemesanan::STATUS_PENDING)
                ->get()
                ->map(function (Pemesanan $item) use ($pembayaran) {
                    $item->copyToDetailPembayaran($pembayaran);
                    return $item;
                });

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
