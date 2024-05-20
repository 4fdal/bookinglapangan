<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {

        $lapangan_paginate = Lapangan::paginate();

        return Inertia::render('Welcome', [
            'lapangan_paginate' => $lapangan_paginate
        ]);
    }
}
