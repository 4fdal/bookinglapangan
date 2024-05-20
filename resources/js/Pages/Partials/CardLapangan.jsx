import Carousel from "@/Components/Carousel";
import { currency } from "@/Helpers/GlobalHelpers";
import { Link } from "@inertiajs/react";
import React from "react";
export default function CardLapangan({
    sources = [],
    title,
    pricePerHouse = 0,
    description,
    location,
    id,
}) {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="card-body d-flex flex-row justify-content-between">
                        <div>
                            <h5 className="card-title">{title}</h5>
                            <h6 className="card-subtitle mb-1">
                                {currency(pricePerHouse)} /Jam
                            </h6>
                            <p className="mb-0">
                                <i className="bi bi-geo-alt"></i>
                                {location}
                            </p>
                        </div>
                    </div>

                    <Carousel sources={sources} />

                    <div className="card-body">
                        {/* <p className="card-text">{description}</p> */}

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary">
                                <i className="bi bi-calendar-plus"></i>
                                &nbsp; Pesan Sekarang
                            </button>

                            <Link
                                href={route("customer.lapangan.show", { id })}
                                className="btn text-primary "
                            >
                                Detail&nbsp;
                                <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
