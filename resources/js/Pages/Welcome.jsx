import CustomerLayout from "@/Layouts/CustomerLayout";
import CardLapangan from "./Partials/CardLapangan";
import React from "react";
import { router } from "@inertiajs/react";

export default function Welcome({
    auth: { user },
    message,
    lapangan_paginate,
}) {
    const query = new URLSearchParams(window.location.search);
    const [search, setSearch] = React.useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(route("welcome", { s: search ?? "" }));
    };

    return (
        <CustomerLayout
            header="Lapangan"
            dataBreadcrumb={[{ label: "Sewa Lapangan", active: true }]}
            user={user}
            message={message}
            headerChildren={
                <div
                    style={{
                        backgroundImage: `url(/assets/static/images/bg/bg_lapangan.jpg)`,
                    }}
                    className="d-flex flex-column py-5"
                >
                    <div className="container">
                        <h3 className="text-center text-white">
                            Booking Lapangan Online
                        </h3>
                        <form method="get" onSubmit={handleSearch}>
                            <div className="d-flex flex-row items-align-center">
                                <input
                                    defaultValue={query.get("s") ?? null}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari Lapangan . . ."
                                    className="form-control"
                                />
                                <button className="btn btn-primary">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        >
            <div className="mt-3 row">
                {lapangan_paginate.data.map((item, index) => {
                    return (
                        <div
                            key={"card-lapangan-" + index}
                            className="col-md-4 col-sm-12"
                        >
                            <CardLapangan
                                title={item.nama}
                                description={item.deskripsi}
                                id={item.id}
                                location={item.lokasi}
                                pricePerHouse={item.harga_per_jam}
                                sources={JSON.parse(item.image)?.map(
                                    (item) => `/storage/${item.path}`
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        </CustomerLayout>
    );
}
