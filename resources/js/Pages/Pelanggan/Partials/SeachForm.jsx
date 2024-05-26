import Lapangan from "@/Models/lapangan";
import React from "react";

export function SeachForm({ onSubmit = (e, data) => {} }) {
    const query = new URLSearchParams(location.search);

    const [namaPelanggan, setNamaPelanggan] = React.useState(
        query.get("nama") ?? null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, {
            namaPelanggan,
        });
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-11 mb-1">
                <input
                    className="form-control"
                    type="text"
                    value={namaPelanggan}
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                    placeholder="Cari Pelanggan..."
                />
            </div>
            <div className="col-md-1 mb-1">
                <button className="btn w-100 btn-primary">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </form>
    );
}
