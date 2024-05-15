<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_pemesanan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pemesanan_id')->nullable();
            $table->string('detail_key')->nullable();
            $table->text('detail_value')->nullable();
            $table->timestamps();

            $table->foreign('pemesanan_id')->references('id')->on('pemesanan')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pemesanan');
    }
};
