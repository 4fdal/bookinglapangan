import CustomerLayout from "@/Layouts/CustomerLayout";
import CardLapangan from "./Partials/CardLapangan";

export default function Welcome({
    auth: { user },
    message,
    lapangan_paginate,
}) {
    return (
        <CustomerLayout
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
                        <div className="d-flex flex-row items-align-center">
                            <input
                                placeholder="Cari Lapangan . . ."
                                className="form-control"
                            />
                            <button className="btn btn-primary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
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
