import ModalImage from "@/Components/ModalImage";
import { currency } from "@/Helpers/GlobalHelpers";
import DetailPembayaran from "@/Models/detail_pembayaran";
import moment from "moment";
import React from "react";

/**
 *
 *
 * @export
 * @param {{ detailItem : DetailPembayaran }} { detailItem }
 * @return {*}
 */
export default function PemesananItem({ detailItem }) {
    const [openModalImage, setOpenModalImage] = React.useState(false);

    return (
        <div className="card shadow-sm mb-2">
            <div className="card-content">
                <div className="card-body">
                    <h5 className="card-title mb-0">
                        {detailItem.lapangan.nama}
                    </h5>
                    <small className="my-0">
                        {currency(detailItem.lapangan.harga_per_jam)} /Jam
                    </small>

                    <div className="row">
                        <div className="col-md-4">
                            <strong>Lama Sewa</strong>
                            <p className="mb-0">
                                {moment(detailItem.tanggal_booking).format(
                                    "DD-MM-YYYY"
                                )}
                                ( {detailItem.waktu_mulai} -{" "}
                                {detailItem.waktu_selesai} )
                            </p>
                            <p className="mb-0">
                                {detailItem.lama_jam_sewa * 30} Menit
                            </p>
                        </div>
                        <div className="col-md-4">
                            <strong>Total Pembayaran</strong>
                            <p className="mb-0">
                                &nbsp;
                                {currency(detailItem.total_harga)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
