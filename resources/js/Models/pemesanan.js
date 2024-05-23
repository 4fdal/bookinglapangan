import moment from "moment";
import Lapangan from "./lapangan";
import User from "./user";

export default class Pemesanan {
    constructor({
        id,
        user_id,
        user,
        lapangan_id,
        lapangan,
        tanggal_booking,
        waktu_mulai,
        waktu_selesai,
        status,
        catatan_pesanan,
    }) {
        this.id = id;
        this.user_id = user_id;
        this.user = new User(user);
        this.lapangan_id = lapangan_id;
        this.lapangan = new Lapangan(lapangan);
        this.tanggal_booking = tanggal_booking;
        this.waktu_mulai = waktu_mulai;
        this.waktu_selesai = waktu_selesai;
        this.status = status;
        this.catatan_pesanan = catatan_pesanan;
    }

    getTanggalBookingId() {
        return moment(this.tanggal_booking).format("DD-MM-YYYY");
    }

    getTotalMinutes() {
        return this.getTotalHours() * 60;
    }

    getStartEndTime() {
        const start = new Date(`${this.tanggal_booking} ${this.waktu_mulai}`);
        const end = new Date(`${this.tanggal_booking} ${this.waktu_selesai}`);

        return { start, end };
    }

    getTotalHours() {
        const { start, end } = this.getStartEndTime();

        return (end - start) / (60 * 60 * 1000);
    }

    getTotalPayment() {
        return this.lapangan.harga_per_jam * this.getTotalHours();
    }
}
