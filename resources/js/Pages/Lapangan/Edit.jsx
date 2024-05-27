import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import CreateEditForm from "./Partials/CreateEditForm";
import React from "react";

export default function Edit({ auth, message, item }) {
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (e, data) => {
        e.preventDefault();
        router.post(route("admin.lapangan.update", { id: item.id }), data, {
            onError: setErrors,
        });
    };

    return (
        <AuthenticatedLayout
            message={message}
            user={auth.user}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Lapangan", link: route("admin.lapangan.index") },
                { label: item.nama, link: "#", active: true },
            ]}
            back={route("admin.lapangan.index")}
            header={`Edit Laparangan ${item.nama}`}
        >
            <Head title="Tambah Lapangan"></Head>

            <CreateEditForm
                onSubmit={handleSubmit}
                errors={errors}
                defaultData={{
                    nama: item.nama,
                    images: JSON.parse(item.image),
                    deskripsi: item.deskripsi,
                    harga_per_jam: item.harga_per_jam,
                    lokasi: item.lokasi,
                }}
            />
        </AuthenticatedLayout>
    );
}
