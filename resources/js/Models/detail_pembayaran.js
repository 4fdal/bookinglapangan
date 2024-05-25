import Lapangan from "./lapangan";

export default class DetailPembayaran {
    constructor({
        pembayaran_id,
        user_id,
        lapangan_id,
        tanggal_booking,
        waktu_mulai,
        waktu_selesai,
        lama_jam_sewa,
        total_harga,
        lapangan = null,
    }) {
        this.pembayaran_id = pembayaran_id;
        this.user_id = user_id;
        this.lapangan_id = lapangan_id;
        this.lapangan = lapangan ? new Lapangan(lapangan) : null;
        this.tanggal_booking = tanggal_booking;
        this.waktu_mulai = waktu_mulai;
        this.waktu_selesai = waktu_selesai;
        this.lama_jam_sewa = lama_jam_sewa;
        this.total_harga = total_harga;
    }

}
