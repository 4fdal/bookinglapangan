import Carousel from "@/Components/Carousel";
import Modal from "@/Components/Modal";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Show({ auth: { user }, message, item }) {
    const images = JSON.parse(item.image);

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
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <h4 className="card-title">{item.nama}</h4>
                                <p>
                                    <i className="bi bi-geo-alt"></i>
                                    {item.lokasi}
                                </p>
                                <p>
                                    {item.deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </CustomerLayout>
    );
}
