import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function PemesananForm({
    start,
    end,
    lapanganId = -1,
    onChange = ({ start, end }) => {},
}) {
    const [errors, setErrors] = React.useState({});

    const [waktuMulai, setWaktuMulai] = React.useState(null);
    const [waktuSelesai, setWaktuSelesai] = React.useState(null);

    React.useEffect(() => {
        setWaktuMulai(moment(start).format("YYYY-MM-DD HH:mm:ss"));
        // setData("waktu_mulai", moment(start).format("YYYY-MM-DD HH:mm:ss"));
    }, [start]);

    React.useEffect(() => {
        setWaktuSelesai(moment(end).format("YYYY-MM-DD HH:mm:ss"));
        // setData("waktu_selesai", moment(end).format("YYYY-MM-DD HH:mm:ss"));
    }, [end]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataSubmit = {
            lapangan_id: lapanganId,
            waktu_mulai: waktuMulai,
            waktu_selesai: waktuSelesai,
        };

        router.post(route("customer.pemesanan.store"), dataSubmit, {
            onError: setErrors,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group position-relative has-icon-left">
                <input
                    type="datetime-local"
                    className={`form-control ${
                        errors.waktu_mulai ? "is-invalid" : ""
                    }`}
                    value={waktuMulai}
                    onChange={(e) => {
                        const valStart = e.target.value;
                        setWaktuMulai(valStart);
                        onChange({ start: valStart, end: waktuSelesai });
                    }}
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
                    value={waktuSelesai}
                    onChange={(e) => {
                        const valEndn = e.target.value;
                        setWaktuSelesai(valEndn);
                        onChange({ start: valEndn, end: waktuSelesai });
                    }}
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
