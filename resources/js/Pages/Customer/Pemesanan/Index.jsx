import CustomerLayout from "@/Layouts/CustomerLayout";
import PemesananItem from "./Partials/PemesanItem";
import Pemesanan from "@/Models/pemesanan";
import { currency } from "@/Helpers/GlobalHelpers";
import { Link } from "@inertiajs/react";

export default function Index({ auth: { user }, message, items = [] }) {
    const totalPembayaran = items.reduce((total, item) => {
        const pemesanan = new Pemesanan(item);
        return total + pemesanan.getTotalPayment();
    }, 0);

    return (
        <CustomerLayout
            dataBreadcrumb={[
                { label: "Sewa Lapangan", link: route("welcome") },
                { label: "Pemesanan", link: "#", active: true },
            ]}
            message={message}
            user={user}
            header="Pemesanan"
        >
            <div className="row">
                <div className="col-md-8">
                    {items.length == 0 && (
                        <div className="justify-content-center">
                            <p>
                                Kamu belum memesan lapangan apapun, pesan
                                lapangan sekarang
                            </p>
                            <Link
                                href={route("welcome")}
                                className="btn btn-primary"
                            >
                                Pesan Sekarang!
                            </Link>
                        </div>
                    )}
                    {items.map((item, index) => (
                        <PemesananItem
                            item={item}
                            key={"card-item-pemesanan-" + index}
                        />
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <h5 className="card-title">Cart Total</h5>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row justify-content-between">
                                        <strong>Subtotal</strong>
                                        <strong className="text-success">
                                            {currency(totalPembayaran)}
                                        </strong>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between">
                                        <strong>Total</strong>
                                        <strong className="text-success">
                                            {currency(totalPembayaran)}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <button className="btn btn-primary">
                                        <strong>Checkout</strong>
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
