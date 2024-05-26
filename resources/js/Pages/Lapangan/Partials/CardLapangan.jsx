import { classList, currency } from "@/Helpers/GlobalHelpers";
import React from "react";
import Carousel from "../../../Components/Carousel";
import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function CardLapangan({
    sources = [],
    title,
    pricePerHouse = 0,
    description,
    location,
    id,
}) {
    const [openModalDelete, setOpenModalDelete] = React.useState(false);

    const handleDelete = () => {
        router.delete(route("lapangan.destroy", { id }));
        setOpenModalDelete(false);
    };

    return (
        <>
            <Modal
                open={openModalDelete}
                actions={
                    <button onClick={handleDelete} className="btn btn-danger">
                        <i className="bi bi-trash"></i>
                        &nbsp;Hapus
                    </button>
                }
                title={`Peringatan!`}
            >
                <p>
                    Data <strong>{title}</strong> akan dihapus dari daftar!
                </p>
            </Modal>
            <div className="card">
                <div className="card-content">
                    <div className="card-body d-flex flex-row justify-content-between">
                        <div>
                            <h5 className="card-title">{title}</h5>
                            <h6 className="card-subtitle">
                                {currency(pricePerHouse)} /Jam
                            </h6>
                        </div>

                        <div className="dropdown">
                            <button
                                className="btn btn-ghost me-1"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="bi bi-gear"></i>
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <a className="dropdown-item" href="#">
                                    Tampilkan
                                </a>
                                <Link
                                    className="dropdown-item"
                                    href={route("admin.lapangan.edit", { id })}
                                >
                                    Edit
                                </Link>
                                <hr className="my-0" />
                                <button
                                    className="dropdown-item text-danger"
                                    onClick={() => setOpenModalDelete(true)}
                                    type="button"
                                >
                                    <i className="bi bi-trash"></i>
                                    &nbsp; Hapus
                                </button>
                            </div>
                        </div>
                    </div>

                    <Carousel sources={sources} />

                    <div className="card-body">
                        <p className="mb-0">
                            <i className="bi bi-geo-alt"></i>
                            {location}
                        </p>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
