<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // $request->user()->fill($request->validated());

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        // $request->user()->save();

        // return Redirect::route('admin.profile.edit');

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

            return redirect()->back()->withMessage([
                'type' => 'success',
                'title' => 'Berhasil',
                'message' => 'Profile akun berhasil diperbarui'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
