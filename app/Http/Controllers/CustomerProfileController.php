<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerProfileController extends Controller
{

    public function edit()
    {
        return Inertia::render('Customer/Profile/Index');
    }

    public function update(Request $request)
    {
        $user_id = Auth::user()->id;

        $user = User::where('id', $user_id)->first();
        $pelanggan = Pelanggan::where('user_id', $user->id)->first();

        if (!isset($pelanggan)) $pelanggan = Pelanggan::create([
            'user_id' => $user->id
        ]);

        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'no_ponsel' => ['required', 'numeric'],
            'alamat' => ['required', 'string'],
            'password' => ['nullable', 'confirmed'],
        ]);


        try {
            DB::beginTransaction();

            if ($user instanceof User) {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->no_ponsel = $request->no_ponsel;

                if (isset($request->password)) {
                    $user->password = Hash::make($request->password);
                }

                $user->save();
            }

            $pelanggan->update($request->only(['alamat']));

            DB::commit();

            if (isset($request->redirect)) {


                return redirect()->back()->withMessage([
                    'type' => 'success',
                    'title' => 'Berhasil',
                    'message' => 'Profile akun berhasil diperbarui'
                ]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
