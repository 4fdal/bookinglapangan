<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pemesanan extends Model
{

    const STATUS_PENDING = 'PENDING';
    const STATUS_PROCESS = 'PROCESS';

    use HasFactory;
    protected $table = "pemesanan";
    protected $fillable = [
        'user_id',
        'lapangan_id',
        'tanggal_booking',
        'waktu_mulai',
        'waktu_selesai',
        'status',
        'catatan_pesanan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class, 'lapangan_id', 'id');
    }

    public function getTotalHours()
    {
        $waktu_mulai = "{$this->tanggal_booking} {$this->waktu_mulai}";
        $waktu_selesai = "{$this->tanggal_booking} {$this->waktu_selesai}";

        return (strtotime($waktu_selesai) - strtotime($waktu_mulai)) / (60 * 60);
    }

    public function getTotalPrice()
    {
        return $this->getTotalHours() * $this->lapangan->harga_per_jam;
    }

    public function copyToDetailPembayaran(Pembayaran $pembayaran)
    {

        $detail_pembayaran_data = [
            'pembayaran_id' => $pembayaran->id,
            'user_id' => $this->user_id,
            'lapangan_id' => $this->lapangan_id,
            'tanggal_booking' => $this->tanggal_booking,
            'waktu_mulai' => $this->waktu_mulai,
            'waktu_selesai' => $this->waktu_selesai,
            'lama_jam_sewa' => $this->getTotalHours(),
            'total_harga' => $this->getTotalPrice(),
        ];

        $detail_pembayaran = DetailPembayaran::create($detail_pembayaran_data);

        $pembayaran->subtotal += $detail_pembayaran->total_harga;
        $pembayaran->total += $detail_pembayaran->total_harga;
        $pembayaran->save();

        $this->status = self::STATUS_PROCESS;
        $this->save();
    }
}
