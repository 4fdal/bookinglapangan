import Lapangan from "@/Models/lapangan";
import React from "react";

export function SeachForm({ lapanganItems, onSubmit = (e, data) => {} }) {
    const query = new URLSearchParams(location.search);

    const [lapanganId, setLapanganId] = React.useState(
        query.get("lapangan_id") ?? null
    );
    const [namaPelanggan, setNamaPelanggan] = React.useState(
        query.get("pelanggan") ?? null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, {
            lapanganId,
            namaPelanggan,
        });
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-5 mb-1">
                <select
                    onChange={(e) => setLapanganId(e.target.value)}
                    className="form-select"
                >
                    <option value="">Semua Lapangan</option>
                    {lapanganItems.map((item) => {
                        const lapangan = new Lapangan(item);
                        return (
                            <option
                                selected={lapangan.id == lapanganId}
                                value={lapangan.id}
                                key={"lapangan-" + lapangan.id}
                            >
                                {lapangan.nama}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="col-md-6 mb-1">
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
