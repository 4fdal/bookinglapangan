import Pembayaran from "@/Models/pembayaran";
import PemesananItem from "./PemesananItem";
import { currency } from "@/Helpers/GlobalHelpers";
import React from "react";
import ModalImage from "@/Components/ModalImage";

/**
 *
 *
 * @export
 * @param {{ pembayaran : Pembayaran }} { pembayaran }
 * @return {*}
 */
export default function PembayaranItem({ pembayaran }) {
    const [openModalImage, setOpenModalImage] = React.useState(false);

    return (
        <div className="card mb-2">
            <ModalImage
                open={openModalImage}
                onClose={() => setOpenModalImage(false)}
                title="Bukti Pembayaran"
                source={pembayaran.getBuktiSource()}
            />
            <div className="card-content">
                <div className="card-body">
                    <p className="card-title mb-0">
                        <strong>Pemesanan</strong>
                        &nbsp;#
                        {new Date(pembayaran.tanggal).getTime()}
                    </p>

                    <p
                        className={`my-0 ${
                            pembayaran.isPaid() ? "text-success" : "text-danger"
                        }`}
                    >
                        {pembayaran.isPaid()
                            ? "Pembyaran Terkonfirmasi"
                            : "Menunggu Konfirmais Admin"}
                    </p>

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
