<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PelangganController extends Controller
{
    public function index(Request $request)
    {
        $per_page = 15;

        if (isset($request->nama)) {
            $per_page = User::count();
        }

        $user = User::with(['pelanggan'])->role([User::ROLE_CUSTOMER]);
        if (isset($request->nama)) {
            $user = $user->where('name', 'like', "%{$request->nama}%");
        }
        $user = $user->paginate($per_page)->toArray();


        return Inertia::render('Pelanggan/Index', [
            'data' => $user
        ]);
    }

    public function show($user_id)
    {
        $user = User::with(['pelanggan'])->find($user_id);
        return Inertia::render('Pelanggan/Show', [
            'item' => $user,
        ]);
    }
}
