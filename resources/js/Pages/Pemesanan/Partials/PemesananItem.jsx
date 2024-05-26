import Modal from "@/Components/Modal";
import { currency } from "@/Helpers/GlobalHelpers";
import DetailPembayaran from "@/Models/detail_pembayaran";
import Pembayaran, { STATUS_PAID, STATUS_PENDING } from "@/Models/pembayaran";
import { router } from "@inertiajs/react";
import moment from "moment";
import React from "react";

/**
 *
 *
 * @export
 * @param {{ item : DetailPembayaran }} { item }
 * @return {*}
 */
export function PembayaranItem({ item }) {
    return (
        <div className="list-group-item list-group-item-action h-100">
            <div className="d-flex flex-column w-100 justify-content-between">
                <strong className="mb">{item.lapangan.nama}</strong>
                <small>
                    {moment(item.tanggal_booking).format("DD-MM-YYYY")} ({" "}
                    {item.waktu_mulai} - {item.waktu_selesai} )
                </small>
            </div>
            <p className="mb-1">{item.lama_jam_sewa * 30} Menit</p>
            <small>{currency(item.total_harga)}</small>
        </div>
    );
}

/**
 *
 *
 * @export
 * @param {{pembayaran : Pembayaran}} { pembayaran }
 * @return {*}
 */
export default function PemesananItem({ pembayaran }) {
    const [openModalKonfirmasi, setOpenModalKonfirmasi] = React.useState(false);

    const handleKonfirmasiPembayaran = (status) => (e) => {
        router.put(
            route("admin.pemesanan.update", {
                pembayaran_id: pembayaran.id,
            }),
            {
                status,
            },
            {
                onSuccess: () => setOpenModalKonfirmasi(false),
            }
        );
    };

    return (
        <div className="card mb-4">
            <Modal
                onClose={() => setOpenModalKonfirmasi(false)}
                title={`Konfirmasi Pemesanan ${pembayaran.user.name}`}
                open={openModalKonfirmasi}
                actions={
                    <div className="btn-group">
                        <button
                            onClick={handleKonfirmasiPembayaran(STATUS_PENDING)}
                            className="btn btn-danger"
                        >
                            Belum Bayar
                        </button>
                        <button
                            onClick={handleKonfirmasiPembayaran(STATUS_PAID)}
                            className="btn btn-success"
                        >
                            Konfirmasi Pembayaran
                        </button>
                    </div>
                }
            >
                <h6 className="mb-0">
                    Subtotal : {currency(pembayaran.subtotal)}
                </h6>
                <h5>Total : {currency(pembayaran.total)}</h5>
                <h6 className="mb-0">Lapangan : </h6>
                <div className="list-group my-3">
                    {pembayaran.detail.map((detail, index) => {
                        return (
                            <PembayaranItem
                                key={"detail-pemabayaran-item-" + index}
                                item={detail}
                            />
                        );
                    })}
                </div>
                <h6 className="mb-0">Bukti Pembayaran : </h6>
                <a target="_blank" href={pembayaran.getBuktiSource()}>
                    <img
                        src={pembayaran.getBuktiSource()}
                        className="w-100"
                        style={{ borderRadius: 10 }}
                    />
                </a>
            </Modal>
            <div className="card-content">
                <div className="card-body">
                    <p className=" mb-0">
                        {pembayaran.user.name} /
                        <a
                            href={pembayaran.user.getWhatsappLink()}
                            target="_blank"
                        >
                            {" " + pembayaran.user.no_ponsel}
                        </a>{" "}
                        /
                        <a
                            href={pembayaran.user.getGamilLink()}
                            target="_blank"
                        >
                            {" " + pembayaran.user.email}
                        </a>{" "}
                    </p>
                    <div className="list-group my-3">
                        {pembayaran.detail.map((detail, index) => {
                            return (
                                <PembayaranItem
                                    key={"detail-pemabayaran-item-" + index}
                                    item={detail}
                                />
                            );
                        })}
                    </div>
                    <h6 className="mb-0">
                        Subtotal : {currency(pembayaran.subtotal)}
                    </h6>
                    <h6 className="mb-0">
                        Total : {currency(pembayaran.total)}
                    </h6>
                </div>
                <div className="card-footer">
                    {pembayaran.isPending() && (
                        <h6 className=" text-warning">
                            Menunggu Mengupload Bukti Pembayaran
                        </h6>
                    )}

                    {pembayaran.isPayment() && (
                        <button
                            onClick={() => setOpenModalKonfirmasi(true)}
                            className="btn btn-sm btn-primary"
                        >
                            <i className="bi bi-check2-all"></i>
                            &nbsp; Konfirmasi Pembayaran
                        </button>
                    )}

                    {pembayaran.isPaid() && (
                        <h6 className=" text-success">
                            Pembayaran Telah Dikonfirmasi
                        </h6>
                    )}
                </div>
            </div>
        </div>
    );
}
