
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import CreateEditForm from "./Partials/CreateEditForm";

export default function Create({ auth, message }) {

    const handleSubmit = (e, data) => {
        e.preventDefault();
        router.post(route('lapangan.store'), data)
    };

    return (
        <AuthenticatedLayout
            message={message}
            user={auth.user}
            back={route("lapangan.index")}
            header="Tambah Laparangan"
        >
            <Head title="Tambah Lapangan"></Head>

            <CreateEditForm onSubmit={handleSubmit} defaultData={{
                nama: null,
                images: [],
                deskripsi: null,
                harga_per_jam: null,
                lokasi: null,
            }} />

        </AuthenticatedLayout>
    );
}
