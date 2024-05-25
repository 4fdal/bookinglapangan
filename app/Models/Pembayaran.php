<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'PENDING';
    const STATUS_PAYMENT = 'PAYMENT';
    const STATUS_PAID = 'PAID';

    protected $table = "pembayaran";
    protected $fillable = ['total', 'subtotal', 'tanggal', 'bukti', 'catatan_pemesanan', 'status', 'user_id'];

    public function pemesanan()
    {
        return $this->belongsTo(Pemesanan::class, 'pemesanan_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function detail()
    {
        return $this->hasMany(DetailPembayaran::class, 'pembayaran_id', 'id');
    }
}
