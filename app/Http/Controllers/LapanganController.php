<?php

namespace App\Http\Controllers;

use App\Models\Lapangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LapanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $lapangan_items = Lapangan::get();

        return Inertia::render('Lapangan/Index', [
            'lapangan_items' =>  $lapangan_items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Lapangan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        $request->validate([
            'images.*' => ['required', 'image'],
            'nama' => ['required', 'string'],
            'harga_per_jam' => ['required', 'numeric'],
            'lokasi' => ['required', 'string'],
            'deskripsi' => ['required', 'string'],
        ]);

        $upload_images = [];


        DB::beginTransaction();
        try {

            foreach ($request->images as $index => $image) {
                if ($image instanceof \Illuminate\Http\UploadedFile) {
                    $upload_images[$index] = [
                        'path' => $image->store('laparangan', 'public'),
                        'originalName' => $image->getClientOriginalName(),
                        'mime' => $image->getMimeType(),
                        'extension' => $image->getClientOriginalExtension(),
                    ];
                }
            }

            $data_create = $request->only('nama', 'harga_per_jam', 'lokasi', 'deskripsi');
            $data_create['image'] = json_encode($upload_images);


            Lapangan::create($data_create);

            DB::commit();

            return redirect()->route('lapangan.index')->withMessage([
                'type' => 'success',
                'title' => 'Berhasil',
                'message' => 'Data lapangan baru berhasil dibuat'
            ]);
        } catch (\Throwable $th) {

            foreach ($upload_images as $index => $upload_image) {
                Storage::delete($upload_image['path']);
            }

            DB::rollBack();
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {


        $lapangan = Lapangan::find($id);
        if (!$lapangan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data lapangan tidak ditemukan'
        ]);

        return Inertia::render('Lapangan/Edit', [
            'item' => $lapangan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $lapangan = Lapangan::find($id);
        if (!$lapangan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data lapangan tidak ditemukan'
        ]);

        $request->validate([
            'images.*' => ['required', 'image'],
            'nama' => ['required', 'string'],
            'harga_per_jam' => ['required', 'numeric'],
            'lokasi' => ['required', 'string'],
            'deskripsi' => ['required', 'string'],
        ]);

        $lapangan_old_images = json_decode($lapangan->image);
        $upload_images = [];

        DB::beginTransaction();
        try {

            foreach ($request->images as $index => $image) {
                if ($image instanceof \Illuminate\Http\UploadedFile) {
                    $upload_images[$index] = [
                        'path' => $image->store('laparangan', 'public'),
                        'originalName' => $image->getClientOriginalName(),
                        'mime' => $image->getMimeType(),
                        'extension' => $image->getClientOriginalExtension(),
                    ];
                }
            }

            $data_update = $request->only('nama', 'harga_per_jam', 'lokasi', 'deskripsi');
            $data_update['image'] = json_encode($upload_images);

            $lapangan->update($data_update);
            foreach ($lapangan_old_images as $key => $lapangan_old_image) {
                Storage::delete($lapangan_old_image->path);
            }

            DB::commit();

            return redirect()->route('lapangan.index')->withMessage([
                'type' => 'success',
                'title' => 'Berhasil',
                'message' => 'Data lapangan baru berhasil diperbaruai'
            ]);
        } catch (\Throwable $th) {

            foreach ($upload_images as $index => $upload_image) {
                Storage::delete($upload_image['path']);
            }

            DB::rollBack();
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $lapangan = Lapangan::find($id);
        if (!$lapangan) return redirect()->back()->withMessage([
            'type' => 'danger',
            'title' => 'Error',
            'message' => 'Data lapangan tidak ditemukan'
        ]);

        $lapangan->delete();

        return redirect()->back()->withMessage([
            'type' => 'success',
            'title' => 'Berhasil',
            'message' => 'Data berhasil dihapus'
        ]);
    }
}
