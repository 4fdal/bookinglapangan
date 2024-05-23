import CustomerLayout from "@/Layouts/CustomerLayout";
import CreateForm from "./Partials/CreateForm";
import Pemesanan from "@/Models/pemesanan";
import { currency } from "@/Helpers/GlobalHelpers";
import React from "react";

export default function Index({ auth: { user }, message, items }) {
    const [errors, setErrors] = React.useState({});

    const totalPembayaran = items.reduce((total, item) => {
        const pemesanan = new Pemesanan(item);
        return total + pemesanan.getTotalPayment();
    }, 0);

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
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <CreateForm />
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
                                        errors.alamat ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {}}
                                    placeholder="Catatan Pesanan"
                                ></textarea>
                                <p className="my-0">
                                    Berikan catatan pesanan terkait apapun,
                                    customer kami mungkin akan
                                    mempertimabangkanya
                                </p>

                                <div className="row mt-4">
                                    <button className="btn btn-primary ">
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
