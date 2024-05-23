import React from "react";
import Modal from "./Modal";
import CalendarSchedule from "./CalendarSchedule";
import moment from "moment";

export default function InputStartEndTimeCalendarModal({
    lapanganId = null,
    exceptId = null,
    start = null,
    end = null,
    title,
    open = false,
    onClose = () => { },
    onSave = ({ start, end }, { errors, setErrors }) => { }
}) {
    const [errors, setErrors] = React.useState({});

    const [isEventLoaded, setIsEventLoaded] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const [waktuMulai, setWaktuMulai] = React.useState(null);
    const [waktuSelesai, setWaktuSelesai] = React.useState(null);

    const [myEvent, setMyEvent] = React.useState(null);

    const loadEvents = () => {
        let params = { id: lapanganId };

        if (exceptId) params.except_id = exceptId;

        fetch(route("api.lapangan.schedule", params))
            .then(async (res) => {
                const { data } = await res.json();
                setEvents(
                    data.map((item) => ({
                        ...item,
                        start: new Date(item.start),
                        end: new Date(item.end),
                    }))
                );
            })
            .catch((err) => console.error(err.message))
            .finally(() => setIsEventLoaded(true));
    };

    const handleSelectSlot = ({ start, end }) => {
        setWaktuMulai(moment(start).format("YYYY-MM-DD HH:mm:ss"));
        setWaktuSelesai(moment(end).format("YYYY-MM-DD HH:mm:ss"));
    };

    const getEvents = () => {
        let listEvents = events;

        if (myEvent) {
            listEvents = [...events, myEvent];
        }

        return listEvents;
    };

    console.log(start, end)

    React.useEffect(() => {
        setWaktuMulai(start)
        setWaktuSelesai(end)
    }, [open])

    React.useEffect(() => {
        if (lapanganId) {
            loadEvents();
        }
    }, []);

    React.useEffect(() => {
        if (waktuMulai && waktuSelesai) {
            setMyEvent({
                id: -1,
                start: new Date(waktuMulai),
                end: new Date(waktuSelesai),
                title: "Pesan",
            });
        }
    }, [waktuMulai, waktuSelesai]);

    return (
        <Modal
            modalLg={true}
            open={open}
            onClose={onClose}
            title={title}
            actions={
                <button className="btn btn-primary" onClick={() => onSave({ start: waktuMulai, end: waktuSelesai }, { errors, setErrors })}>
                    <i className="bi bi-floppy"></i>
                    &nbsp;Simpan
                </button>
            }
        >
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <label>Waktu Mulai</label>
                        <div className="form-group position-relative has-icon-left">
                            <input
                                type="datetime-local"
                                className={`form-control ${errors.waktu_mulai ? "is-invalid" : ""
                                    }`}
                                value={waktuMulai}
                                onChange={(e) => setWaktuMulai(e.target.value)}
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
                    </div>
                    <div className="col-md-6">
                        <label>Waktu Selesai</label>
                        <div className="form-group position-relative has-icon-left">
                            <input
                                type="datetime-local"
                                className={`form-control ${errors.waktu_selesai ? "is-invalid" : ""
                                    }`}
                                value={waktuSelesai}
                                onChange={(e) =>
                                    setWaktuSelesai(e.target.value)
                                }
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
                    </div>
                </div>
            </form>
            {isEventLoaded && <CalendarSchedule
                events={getEvents()}
                onSelectSlot={handleSelectSlot}
            />}
        </Modal>
    );
}
