import DetailPembayaran from "./detail_pembayaran";
import User from "./user";

export const STATUS_PENDING = "PENDING";
export const STATUS_PAYMENT = "PAYMENT";
export const STATUS_PAID = "PAID";

export default class Pembayaran {
    constructor({
        total,
        subtotal,
        tanggal,
        bukti,
        catatan_pemesanan,
        status,
        user_id,
        user = null,
        detail = [],
    }) {
        this.total = total;
        this.subtotal = subtotal;
        this.tanggal = tanggal;
        this.bukti = bukti;
        this.catatan_pemesanan = catatan_pemesanan;
        this.status = status;
        this.user_id = user_id;
        this.user = user ? new User(user) : null;
        this.detail = detail.map((item) => new DetailPembayaran(item));
    }

    getBuktiSource() {
        const bukti = JSON.parse(this.bukti);
        return "/storage/" + bukti.path;
    }

    isPending() {
        return this.status == STATUS_PENDING;
    }

    isPayment() {
        return this.status == STATUS_PAYMENT;
    }

    isPaid() {
        return this.status == STATUS_PAID;
    }
}
