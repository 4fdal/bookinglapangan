import Pembayaran from "@/Models/pembayaran";
import PemesananItem from "./PemesananItem";
import { currency } from "@/Helpers/GlobalHelpers";
import React from "react";
import ModalImage from "@/Components/ModalImage";
import { Link, router } from "@inertiajs/react";
import ModalUploadButkiPembayaran from "./ModalUploadButkiPembayaran";

/**
 *
 *
 * @export
 * @param {{ pembayaran : Pembayaran, rekening_penerima : { bank, nomor, pemilik } }} { pembayaran }
 * @return {*}
 */
export default function PembayaranItem({ pembayaran, rekening_penerima }) {
    const [openModalImage, setOpenModalImage] = React.useState(false);

    const [openUploadButkiModal, setOpenUoloadBuktiModal] =
        React.useState(false);
    const [errors, setErrors] = React.useState({});
    const handleDonePayment = (bukti) => {
        router.post(
            route("customer.pemesanan.pembayaran.update", {
                id: pembayaran.id,
            }),
            { bukti },
            { onSuccess: () => setOpenUoloadBuktiModal(false) }
        );
    };

    return (
        <div className="card mb-2">
            <ModalImage
                open={openModalImage}
                onClose={() => setOpenModalImage(false)}
                title="Bukti Pembayaran"
                source={pembayaran.getBuktiSource()}
            />
            <ModalUploadButkiPembayaran
                rekbank={rekening_penerima.bank}
                reknomor={rekening_penerima.nomor}
                rekpemilik={rekening_penerima.pemilik}
                errors={errors}
                onClose={() => setOpenUoloadBuktiModal(false)}
                totalPembayaran={pembayaran.total}
                open={openUploadButkiModal}
                onDonePayment={handleDonePayment}
            />
            <div className="card-content">
                <div className="card-body">
                    <p className="card-title mb-0">
                        <strong>Pemesanan</strong>
                        &nbsp;#
                        {new Date(pembayaran.tanggal).getTime()}
                    </p>

                    {pembayaran.isPaid() && (
                        <strong className="my-0 text-success">
                            Pembayaran Terkonfirmasi
                        </strong>
                    )}

                    {pembayaran.isPayment() && (
                        <strong className="my-0 text-warning">
                            Menunggu Konfirmais Admin
                        </strong>
                    )}

                    {pembayaran.isPending() && (
                        <div className="d-flex flex-column">
                            <strong className="my-0 text-danger">
                                Pembayaran Tidak Sesuai
                            </strong>
                            <p className="my-0">
                                Maaf mohon input kembali bukti pembayaran yang
                                sesuai, admin tidak dapat mengkonfirmasi bahwa
                                anda telah melakukan pembayaran, segera lakukan
                                upload ulang bukti pemabayaran dibawah ini
                            </p>
                            <button
                                onClick={() => setOpenUoloadBuktiModal(true)}
                                className="btn btn-primary"
                            >
                                Upload Ulang Bukti Pembayaran
                            </button>
                            <p className="my-0">
                                Jika ini tidak benar atau memang kesalahan kami
                                silahkan hubungi kami di{" "}
                                <Link>Kontak Kami</Link>{" "}
                            </p>
                        </div>
                    )}

                    {pembayaran.detail.map((detailItem, indexItem) => {
                        return (
                            <PemesananItem
                                detailItem={detailItem}
                                key={`peymayaran-${pembayaran.id}-detail-${detailItem.id}`}
                            />
                        );
                    })}

                    <p className="mb-0">
                        <strong>Subtotal</strong>
                        &nbsp;
                        {currency(pembayaran.subtotal)}
                    </p>
                    <p className="mb-0">
                        <strong>Total</strong>
                        &nbsp;
                        {currency(pembayaran.total)}
                    </p>

                    <button
                        className="btn btn-primary mt-2"
                        onClick={() => setOpenModalImage(true)}
                    >
                        Cek Bukti Pemabayaran
                    </button>
                </div>
            </div>
        </div>
    );
}
