<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPembayaran extends Model
{
    use HasFactory;

    protected $table = "detail_pembayaran";
    protected $fillable = [
        'pembayaran_id',
        'user_id',
        'lapangan_id',
        'tanggal_booking',
        'waktu_mulai',
        'waktu_selesai',
        'lama_jam_sewa',
        'total_harga',
    ];

    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class, 'lapangan_id', 'id');
    }
}
