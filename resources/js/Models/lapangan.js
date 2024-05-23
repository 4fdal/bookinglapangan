export default class Lapangan {
    constructor({ image, nama, harga_per_jam, lokasi, deskripsi }) {
        this.image = image;
        this.nama = nama;
        this.harga_per_jam = parseFloat(harga_per_jam);
        this.lokasi = lokasi;
        this.deskripsi = deskripsi;
    }
}
