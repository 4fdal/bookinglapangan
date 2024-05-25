import CustomerLayout from "@/Layouts/CustomerLayout";
import Pembayaran from "@/Models/pembayaran";
import { Head } from "@inertiajs/react";
import PembayaranItem from "./Partials/PembayaranItem";

export default function Index({ auth: { user }, message, items }) {
    return (
        <CustomerLayout
            dataBreadcrumb={[
                { label: "Sewa Lapangan", link: route("welcome") },
                { label: "Pemesanan", link: route("customer.pemesanan.index") },
                { label: "Riwayat Pemesanan", active: true },
            ]}
            user={user}
            message={message}
            back={route("customer.pemesanan.index")}
            header={"Riwayat Pemesanan"}
        >
            <Head title="Riwayat Pemesanan" />

            <div className="row">
                <div className="col-md-12">
                    {items.map((item, index) => {
                        const pembayaran = new Pembayaran(item);

                        return (
                            <PembayaranItem
                                key={`item-riwayat-pemesanan-${index}`}
                                pembayaran={pembayaran}
                            />
                        );
                    })}
                </div>
            </div>
        </CustomerLayout>
    );
}
