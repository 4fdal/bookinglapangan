import React from "react";
import Modal from "../../../../../Components/Modal";
import { currency } from "@/Helpers/GlobalHelpers";

export default function ModalUploadButkiPembayaran({
    open = false,
    rekbank,
    reknomor,
    rekpemilik,
    totalPembayaran = 0,
    onClose = () => {},
    onDonePayment = () => {},
}) {
    const inputFileRef = React.useRef();
    const [file, setFile] = React.useState(null);
    const [source, setSource] = React.useState(null);

    const handleUploadFileBukti = () => {
        inputFileRef.current.click();
    };

    const handleChangeFile = (e) => {
        const fileUpload = e.target.files[0];

        setFile(fileUpload);
        setSource(URL.createObjectURL(fileUpload));
    };

    return (
        <Modal
            onClose={onClose}
            open={open}
            actions={
                <button
                    onClick={(e) => onDonePayment(file)}
                    className="btn btn-primary"
                >
                    Selesaikan Pemebayaran
                </button>
            }
            title="Upload Bukti Pembayaran"
        >
            <p className="my-0">
                Silahkan anda lanjutkan pembayaran sebagai berikut :
            </p>
            <p className="mt-0">
                <strong>Jumlah Pembayaran : </strong>
                {currency(totalPembayaran)}
            </p>
            <p className="my-0">Pada rekening bank sebagai berikut :</p>
            <p className="my-0">
                <strong>Rekening Bank : </strong>
                {rekbank}
            </p>
            <p className="my-0">
                <strong>Rekening Nomor : </strong>
                {reknomor}
            </p>
            <p className="mt-0">
                <strong>Rekening Nama : </strong>
                {rekpemilik}
            </p>

            <p>
                Setelah anda menyelesaikan pembayaran, anda dapat mengunggah
                bukti pengiriman atau pembayaran pada tombol di bawah ini!
            </p>

            {source && (
                <>
                    <p className="my-0">Berikut bukti pembayaran saya!</p>
                    <img
                        src={source}
                        className="w-100"
                        style={{ borderRadius: 5 }}
                    />
                    <p>
                        Admin akan mencoba mengkonfirmasi pembayaran secepatnya,
                        jika belum menerima konfirmasi, silahkan datang ke
                        lapangan sesuai dengan jadwal pilihan anda dan
                        perlihatkan bukti pengiriman pada website ini
                    </p>
                </>
            )}

            <button
                onClick={handleUploadFileBukti}
                className="mt-3 btn btn-primary"
            >
                <i className="bi bi-credit-card"></i> Upload Bukti Pembayaran
            </button>
            <input
                accept="image/*"
                className="d-none"
                type="file"
                ref={inputFileRef}
                onChange={handleChangeFile}
            />
        </Modal>
    );
}
