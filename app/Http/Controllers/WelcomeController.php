<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {

        $lapangan_paginate = new Lapangan();

        if (isset($request->s)) {
            $lapangan_paginate = $lapangan_paginate->where("nama", "like", "%{$request->s}%");
        }

        $lapangan_paginate = $lapangan_paginate->paginate();

        return Inertia::render('Welcome', [
            'lapangan_paginate' => $lapangan_paginate
        ]);
    }
}
