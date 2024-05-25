import CustomerLayout from "@/Layouts/CustomerLayout";
import ModalUploadButkiPembayaran from "./Partials/ModalUploadButkiPembayaran";
import CreateForm from "./Partials/CreateForm";
import Pemesanan from "@/Models/pemesanan";
import User from "@/Models/user";
import { currency } from "@/Helpers/GlobalHelpers";
import React from "react";
import { router } from "@inertiajs/react";

export default function Index({
    auth: { user },
    message,
    items,
    rekening_penerima,
}) {
    user = new User(user);

    const [pemabayaranErrors, setPembayaranErrors] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [no_ponsel, setNoPonsel] = React.useState(user.no_ponsel);
    const [alamat, setAlamat] = React.useState(user?.pelanggan?.alamat);
    const [catatan_pesanan, setCatatanPesanan] = React.useState(
        user.catatan_pesanan
    );

    const [openModalUploadButkiPembayaran, seOpentModalBuktiPembayaran] =
        React.useState(false);

    const totalPembayaran = items.reduce((total, item) => {
        const pemesanan = new Pemesanan(item);
        return total + pemesanan.getTotalPayment();
    }, 0);

    const handleChangeCreateForm = ({ name, email, no_ponsel, alamat }) => {
        setName(name);
        setEmail(email);
        setNoPonsel(no_ponsel);
        setAlamat(alamat);
    };

    const handlePayment = () => {
        router.put(
            route("customer.profile.update"),
            {
                name,
                email,
                no_ponsel,
                alamat,
            },
            {
                onError: setErrors,
                onSuccess: () => {
                    setErrors({});
                    seOpentModalBuktiPembayaran(true);
                },
            }
        );
    };

    const handleDonePayment = (bukti) => {
        const pemesanan_ids = items.map((item) => item.id);
        router.post(
            route("customer.pemesanan.pembayaran.store"),
            {
                pemesanan_ids,
                bukti,
                catatan_pesanan,
            },
            {
                onError: setPembayaranErrors,
                onSuccess: () => {
                    setPembayaranErrors({});
                    seOpentModalBuktiPembayaran(false);
                },
            }
        );
    };

    return (
        <CustomerLayout
            dataBreadcrumb={[
                { label: "Sewa Lapangan", link: route("welcome") },
                { label: "Pemesanan", link: route("customer.pemesanan.index") },
                { label: "Checkout", active: true },
            ]}
            user={user}
            message={message}
            back={route("customer.pemesanan.index")}
            header={"Checkout"}
        >
            <ModalUploadButkiPembayaran
                errors={pemabayaranErrors}
                open={openModalUploadButkiPembayaran}
                onClose={() => seOpentModalBuktiPembayaran(false)}
                onDonePayment={handleDonePayment}
                rekbank={rekening_penerima.bank}
                reknomor={rekening_penerima.nomor}
                rekpemilik={rekening_penerima.pemilik}
                totalPembayaran={totalPembayaran}
            />

            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <CreateForm
                                    email={email}
                                    name={name}
                                    no_ponsel={no_ponsel}
                                    alamat={alamat}
                                    onChange={handleChangeCreateForm}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <h5 className="card-title">Pemesanan</h5>

                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row justify-content-between">
                                        <strong>Lapangan</strong>
                                        <strong>Total</strong>
                                    </div>
                                    {items.map((item, index) => {
                                        const pemesanan = new Pemesanan(item);

                                        return (
                                            <div
                                                key={`item-checkout-${index}`}
                                                className="d-flex flex-row justify-content-between align-items-center"
                                            >
                                                <p>
                                                    {pemesanan.lapangan.nama}
                                                    <br />(
                                                    {pemesanan.getTotalMinutes()}
                                                    Menit)
                                                </p>
                                                <p>
                                                    {currency(
                                                        pemesanan.getTotalPayment()
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    })}

                                    <hr className="mt-0" />
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <strong>Subtotal</strong>
                                        <strong>
                                            {currency(totalPembayaran)}
                                        </strong>
                                    </div>

                                    <hr className="mt-0" />
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <strong>Total</strong>
                                        <strong>
                                            {currency(totalPembayaran)}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer mt-0">
                                <div className="form-group">
                                    <div className="d-flex flex-row">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            className="form-check-input form-check-primary form-check-glow"
                                        />
                                        <strong>
                                            &nbsp;Kirim Bukti Transfer Bank
                                        </strong>
                                    </div>
                                </div>

                                <textarea
                                    className={`form-control ${
                                        errors.catatan_pesanan
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    onChange={(e) =>
                                        setCatatanPesanan(e.target.value)
                                    }
                                    placeholder="Catatan Pesanan"
                                ></textarea>
                                <p className="my-0">
                                    Berikan catatan pesanan terkait apapun,
                                    customer kami mungkin akan
                                    mempertimabangkanya
                                </p>

                                <div className="row mt-4">
                                    <button
                                        type="button"
                                        onClick={handlePayment}
                                        className="btn btn-primary "
                                    >
                                        Bayar Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
