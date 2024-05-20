<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerLapanganController extends Controller
{
    public function show($id)
    {

        $lapangan = Lapangan::find($id);
        if (!$lapangan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data lapangan tidak ditemukan'
        ]);

        return Inertia::render('Customer/Lapangan/Show', [
            'item' => $lapangan,
        ]);
    }
}
