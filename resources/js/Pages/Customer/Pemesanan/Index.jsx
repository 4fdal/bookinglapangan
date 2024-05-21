import CustomerLayout from "@/Layouts/CustomerLayout";

export default function Index({ auth: { user }, message, items }) {
    return (
        <CustomerLayout
            dataBreadcrumb={[
                { label: "Sewa Lapangan", link: route("welcome") },
                { label: "Pemesanan", link: "#", active: true },
            ]}
            message={message}
            user={user}
        ></CustomerLayout>
    );
}
