import CalendarSchedule from "@/Components/CalendarSchedule";
import Carousel from "@/Components/Carousel";
import Modal from "@/Components/Modal";
import { currency } from "@/Helpers/GlobalHelpers";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import PemesananForm from "./Partials/PemesananForm";

export default function Show({ auth: { user }, message, item }) {
    const images = JSON.parse(item.image);

    const [startOrder, setStartOrder] = React.useState(null);
    const [endOrder, setEndOrder] = React.useState(null);
    const [myEvent, setMyEvent] = React.useState({
        id: -1,
        title: null,
        start: new Date(),
        end: new Date(),
    });

    const [modalImage, setModalImage] = React.useState({
        open: false,
        title: null,
        source: null,
    });

    const handleImageClick = (e, { source, index }) => {
        setModalImage({
            open: true,
            title: "Lapangan " + item.nama,
            source: source,
        });
    };

    const handleSelectSlot = ({ start, end }) => {
        setStartOrder(start);
        setEndOrder(end);

        setMyEvent({
            id: -1,
            start,
            end,
            title: "Pesan disini",
        });
    };

    const handlePemesananFormChange = ({ start, end }) => {
        if (end > start) {
            start = new Date(start);
            end = new Date(end);

            setMyEvent({
                id: -1,
                start,
                end,
                title: "Pesan disini",
            });
        }
    };

    return (
        <CustomerLayout
            dataBreadcrumb={[
                { label: "Sewa Lapangan", link: route("welcome") },
                { label: item.nama, link: "#", active: true },
            ]}
            message={message}
            user={user}
        >
            <Head title={item.nama} />

            <Modal
                modalLg={true}
                title={modalImage.title}
                open={modalImage.open}
                onClose={() =>
                    setModalImage({ open: false, title: null, source: null })
                }
            >
                <img src={modalImage.source} className="w-100" />
            </Modal>

            <div className="card mb-3">
                <div className="card-content p-3">
                    <Carousel
                        onImageClick={handleImageClick}
                        height="50vh"
                        sources={images.map(
                            (image) => `/storage/${image.path}`
                        )}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-content">
                            <div className="card-body">
                                <h4 className="card-title">{item.nama}</h4>
                                <p>
                                    <i className="bi bi-geo-alt"></i>
                                    {item.lokasi}
                                </p>
                                <p>{item.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <h4 className="card-title">Pemesanan</h4>
                                <CalendarSchedule
                                    events={[myEvent]}
                                    onSelectSlot={handleSelectSlot}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <span>Harga Sewa Lapangan</span>
                                <h5 className="card-title">
                                    {currency(item.harga_per_jam)} / Jam
                                </h5>
                            </div>
                        </div>
                        <div className="card-footer">
                            <PemesananForm
                                lapanganId={item.id}
                                start={startOrder}
                                end={endOrder}
                                onChange={handlePemesananFormChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}

/** order  step
 * 1. cek pada table tanggal berapa yang kosong dan field lain yang kosong
 * 2. simpan data kosong hanya tanggal booking saja pada table order, jika sebelumnya hanya ada tanggal yang berisi pada data row table maka update data tersebut
 */
