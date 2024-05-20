import CalendarSchedule from "./CalendarSchedule";
import Modal from "./Modal";

export default function ModalOrderField({
    open = false,
    start = null,
    end = null,
    onClose = () => {},
}) {
    const handleSelectSlot = ({ start, end }) => {};

    return (
        <Modal open={open} modalLg={true} onClose={onClose} title="Pemesanan">
            {start && end && (
                <CalendarSchedule onSelectSlot={handleSelectSlot} />
            )}
        </Modal>
    );
}
