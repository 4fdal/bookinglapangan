import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
const localizer = momentLocalizer(moment);

export default function Index({
    auth: { user },
    message,
    data,
    lapangan_items,
}) {
    data = data.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
    }));

    const query = new URLSearchParams(window.location.search);
    const handleChangeLapangan = ({ target: { value: lapangan_id } }) => {
        router.get(
            route("admin.schedule.index", {
                lapangan_id,
            })
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            message={message}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Kalender Pemesanan", link: "#", active: true },
            ]}
            header={`Kalender Pemesanan`}
        >
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <select
                            onChange={handleChangeLapangan}
                            className="form-select mb-2"
                        >
                            <option value="">Semua Lapangan</option>
                            {lapangan_items.map((item, index) => {
                                return (
                                    <option
                                        selected={
                                            item.id == query.get("lapangan_id")
                                        }
                                        key={"option-lapangan-" + index}
                                        value={item.id}
                                    >
                                        {item.nama}
                                    </option>
                                );
                            })}
                        </select>

                        <Calendar
                            events={data}
                            defaultView={Views.WEEK}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                    </div>
                </div>
            </div>

            <Head title={`Kalender Pemesanan`} />
        </AuthenticatedLayout>
    );
}
