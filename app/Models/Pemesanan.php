<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
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

        return strtotime($waktu_selesai) - strtotime($waktu_selesai) / (60 * 60);
    }

    public function getTotalPrice()
    {
        return $this->getTotalHours() * $this->lapangan->harga_per_jam;
    }
}
