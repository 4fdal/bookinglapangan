<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CustomerProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!isset($pelanggan)) $pelanggan = Pelanggan::create([
            'user_id' => $user->id
        ]);

        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'no_ponsel' => ['required', 'numeric'],
            'alamat' => ['required', 'string']
        ]);

        try {
            DB::beginTransaction();

            if ($user instanceof User) {
                $user->update($request->only(['name', 'email', 'no_ponsel']));
            }
            $pelanggan->update($request->only(['alamat']));


            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
