<?php

namespace App\Http\Middleware;

use App\Models\Pemesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $user = $request->user();

        if (isset($user)) {
            if (isset($user->pelanggan)) $user->pelanggan =  $user->pelanggan ?? null;

            if ($user->hasRole(User::ROLE_CUSTOMER)) {
                $user->cart = Pemesanan::where('status', Pemesanan::STATUS_PENDING)->count();
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'message' => $request->session()->get('message'),
        ];
    }
}
