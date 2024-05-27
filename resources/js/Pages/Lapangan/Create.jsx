import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import CreateEditForm from "./Partials/CreateEditForm";
import React from "react";

export default function Create({ auth, message }) {
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (e, data) => {
        e.preventDefault();
        router.post(route("admin.lapangan.store"), data, {
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
                { label: "Tambah", link: "#", active: true },
            ]}
            back={route("admin.lapangan.index")}
            header="Tambah Laparangan"
        >
            <Head title="Tambah Lapangan"></Head>

            <CreateEditForm
                errors={errors}
                onSubmit={handleSubmit}
                defaultData={{
                    nama: null,
                    images: [],
                    deskripsi: null,
                    harga_per_jam: null,
                    lokasi: null,
                }}
            />
        </AuthenticatedLayout>
    );
}
