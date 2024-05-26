import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import CardLapangan from "./Partials/CardLapangan";

function LapanganItem({
    item: { image, nama, deskripsi, lokasi, harga_per_jam, id },
}) {
    const getSources = () => {
        try {
            return JSON.parse(image).map((source, index) => {
                return "/storage/" + source.path;
            });
        } catch (error) {
            console.log("[errors] LapanganItem", error);
            return [];
        }
    };

    return (
        <div className="col-md-4">
            <CardLapangan
                title={nama}
                description={deskripsi}
                pricePerHouse={harga_per_jam}
                sources={getSources()}
                location={lokasi}
                id={id}
            />
        </div>
    );
}

export default function Index(props) {
    const { auth, message, lapangan_items } = props;

    return (
        <AuthenticatedLayout
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Lapangan", link: "#", active: true },
            ]}
            message={message}
            user={auth.user}
            header="Laparangan"
            headerRight={
                <Link
                    href={route("admin.lapangan.create")}
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus"></i>
                    Buat
                </Link>
            }
        >
            <div className="row">
                {lapangan_items.map((lapangan, index) => (
                    <LapanganItem
                        item={lapangan}
                        key={"lapangan-item-" + index}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
