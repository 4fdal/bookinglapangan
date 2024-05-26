import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth: { user }, message, data }) {
    return (
        <AuthenticatedLayout
            user={user}
            message={message}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Pelanggan", link: "#", active: true },
            ]}
            header="Pelanggan"
        >
            <Head title="Pelanggan" />
        </AuthenticatedLayout>
    );
}
