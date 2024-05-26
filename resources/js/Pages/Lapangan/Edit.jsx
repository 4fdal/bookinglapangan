
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import CreateEditForm from "./Partials/CreateEditForm";

export default function Edit({ auth, message, item }) {


    const handleSubmit = (e, data) => {
        e.preventDefault();
        router.post(route('admin.lapangan.update', { id: item.id }), data)
    };


    return (
        <AuthenticatedLayout
            message={message}
            user={auth.user}
            back={route("admin.lapangan.index")}
            header={`Edit Laparangan ${item.nama}`}
        >
            <Head title="Tambah Lapangan"></Head>

            <CreateEditForm onSubmit={handleSubmit} defaultData={{
                nama: item.nama,
                images: JSON.parse(item.image),
                deskripsi: item.deskripsi,
                harga_per_jam: item.harga_per_jam,
                lokasi: item.lokasi,
            }} />

        </AuthenticatedLayout>
    );
}
