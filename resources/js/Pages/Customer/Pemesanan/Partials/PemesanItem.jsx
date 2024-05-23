import InputStartEndTimeCalendarModal from "@/Components/InputStartEndTimeCalendarModal";
import Modal from "@/Components/Modal";
import { currency } from "@/Helpers/GlobalHelpers";
import Pemesanan from "@/Models/pemesanan";
import { router } from "@inertiajs/react";
import React from "react";

export default function PemesananItem({ item }) {
    const pemesanan = new Pemesanan(item);

    const [openCalendarUpdate, setOpenCalendarUpdate] = React.useState(false)

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const handleDelete = () => {
        router.delete(
            route("customer.pemesanan.destroy", { id: pemesanan.id })
        );
        setOpenDeleteModal(false);
    };

    const handleUpdate = ({ start, end }, { setErrors }) => {
        const data = {
            'waktu_mulai': start,
            'waktu_selesai': end
        }

        router.put(route('customer.pemesanan.update', {
            id: pemesanan.id,
        }), data, {
            onError: setErrors
        })

        setOpenCalendarUpdate(false)
    }

    return (
        <div className="card my-1">
            <InputStartEndTimeCalendarModal
                start={`${pemesanan.tanggal_booking} ${pemesanan.waktu_mulai}`}
                end={`${pemesanan.tanggal_booking} ${pemesanan.waktu_selesai}`}
                onClose={() => setOpenCalendarUpdate(false)}
                onSave={handleUpdate}
                exceptId={pemesanan.id}
                lapanganId={pemesanan.lapangan_id}
                open={openCalendarUpdate}
                title={`Ubah waktu pemesanana ${pemesanan.lapangan.nama}`}
            />

            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title={`Pemberitahuan`}
                actions={
                    <button onClick={handleDelete} className="btn btn-danger">
                        <i className="bi bi-trash"></i>
                        &nbsp;Hapus
                    </button>
                }
            >
                <p>Pemesanan {pemesanan.lapangan.nama} akan dihapus?</p>
            </Modal>

            <div className="card-content">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">
                            {pemesanan.lapangan.nama}
                        </h5>
                        <div className="dropdown">
                            <button
                                className="btn "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <button onClick={() => setOpenCalendarUpdate(true)} className="dropdown-item" href="#">
                                    Ubah Waktu Pemesanan
                                </button>
                                <hr className="my-0" />
                                <button
                                    type="button"
                                    className="dropdown-item text-danger"
                                    onClick={() => setOpenDeleteModal(true)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="my-0">
                                <i className="bi bi-tag"></i>
                                &nbsp;
                                {currency(
                                    pemesanan.lapangan.harga_per_jam
                                )}{" "}
                                /Jam
                            </p>
                            <p className="my-0">
                                <i className="bi bi-geo-alt"></i>
                                &nbsp;{pemesanan.lapangan.lokasi}
                            </p>
                            <p className="my-0">
                                <i className="bi bi-calendar-week"></i>
                                &nbsp;{pemesanan.getTanggalBookingId()}
                                &nbsp;({pemesanan.waktu_mulai} s/d.
                                {pemesanan.waktu_selesai})
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="my-0">
                                Durasi :
                                <strong>
                                    &nbsp;{pemesanan.getTotalMinutes()} Menit
                                </strong>
                            </p>
                            <p className="my-0">
                                Total Pebayaran :
                                <strong>
                                    &nbsp;
                                    {currency(pemesanan.getTotalPayment())}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
