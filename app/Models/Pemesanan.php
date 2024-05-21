<?php

namespace App\Models;

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
    ];
}
