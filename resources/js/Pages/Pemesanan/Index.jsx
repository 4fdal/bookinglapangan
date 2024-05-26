import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pembayaran from "@/Models/pembayaran";
import PemesananItem from "./Partials/PemesananItem";
import { Head, Link, router } from "@inertiajs/react";
import { SeachForm } from "./Partials/SeachForm";
import { classList } from "@/Helpers/GlobalHelpers";

export default function Index({
    auth: { user },
    message,
    data,
    lapangan_items,
}) {
    const handleSubmit = (e, { lapanganId, namaPelanggan }) => {
        router.get(
            route("admin.pemesanan.index", {
                lapangan_id: lapanganId,
                pelanggan: namaPelanggan,
            })
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            message={message}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Pemesanan", link: "#", active: true },
            ]}
            header="Pemesanan"
        >
            <Head title="Pemesanan" />
            <div className="card mb-2">
                <div className="card-content">
                    <div className="card-body p-2">
                        <SeachForm
                            onSubmit={handleSubmit}
                            lapanganItems={lapangan_items}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                {data?.data?.map((item, index) => {
                    const pembayaran = new Pembayaran(item);
                    return (
                        <div
                            className="col-md-4"
                            key={"pemesanan-item-" + index}
                        >
                            <PemesananItem pembayaran={pembayaran} />
                        </div>
                    );
                })}
            </div>
            {data.links.length > 3 && (
                <div className=" p-2 d-flex justify-content-center">
                    <div className="btn-group">
                        {data.links.map((item, index) => {
                            if (item.url == null) return <></>;

                            let label = item.label;
                            if (index == 0) {
                                label = (
                                    <i className="bi bi-chevron-double-left"></i>
                                );
                            } else if (index == data.links.length - 1) {
                                label = (
                                    <i className="bi bi-chevron-double-right"></i>
                                );
                            }

                            return (
                                <Link
                                    key={"link-pagination-" + index}
                                    className={classList({
                                        active: item.active,
                                        btn: true,
                                        "btn-primary": true,
                                    })}
                                    href={item.url}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
