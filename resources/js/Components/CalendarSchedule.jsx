import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CalendarSchedule({
    onSelectSlot,
    defaultView = Views.WEEK,
    events = [],
}) {
    return (
        <div>
            <Calendar
                events={events}
                views={["week", "day"]}
                defaultView={defaultView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}
