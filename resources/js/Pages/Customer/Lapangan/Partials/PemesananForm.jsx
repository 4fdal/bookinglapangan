import { useForm } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function PemesananForm({ start, end }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        waktu_mulai: null,
        waktu_selesai: null,
    });

    React.useEffect(() => {
        setData("waktu_mulai", moment(start).format("YYYY-MM-DD HH:mm:ss"));
    }, [start]);

    React.useEffect(() => {
        setData("waktu_selesai", moment(end).format("YYYY-MM-DD HH:mm:ss"));
    }, [end]);

    return (
        <form>
            <div className="form-group position-relative has-icon-left">
                <input
                    type="datetime-local"
                    className={`form-control ${
                        errors.waktu_mulai ? "is-invalid" : ""
                    }`}
                    value={data.waktu_mulai}
                    onChange={(e) => setData("waktu_mulai", e.target.value)}
                    placeholder="Waktu Mulai Sewa"
                />
                <div className="form-control-icon">
                    <i className="bi bi-calendar-week" />
                </div>
                <div class="invalid-feedback">
                    <i class="bx bx-radio-circle"></i>
                    {errors.waktu_mulai}
                </div>
            </div>
            <div className="form-group position-relative has-icon-left">
                <input
                    type="datetime-local"
                    className={`form-control ${
                        errors.waktu_selesai ? "is-invalid" : ""
                    }`}
                    value={data.waktu_selesai}
                    onChange={(e) => setData("waktu_selesai", e.target.value)}
                    placeholder="Waktu Selesai Sewa"
                />
                <div className="form-control-icon">
                    <i className="bi bi-calendar-week" />
                </div>
                <div class="invalid-feedback">
                    <i class="bx bx-radio-circle"></i>
                    {errors.waktu_selesai}
                </div>
            </div>
            <button className="btn btn-primary ">
                <i className="bi bi-calendar-plus"></i> Pesan Sekarang
            </button>
        </form>
    );
}
