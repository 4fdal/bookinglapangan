import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import User from "@/Models/user";

export default function Index({ auth: { user }, message, item }) {
    const customer = new User(item);

    return (
        <AuthenticatedLayout
            user={user}
            message={message}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Pelanggan", link: route("admin.pelanggan.index") },
                { label: customer.name, link: "#", active: true },
            ]}
            back={route("admin.pelanggan.index")}
            header={`Pelanggan ${customer.name}`}
        >
            <Head title={`Pelanggan ${customer.name}`} />

            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action ">
                                <div className="d-flex flex-column">
                                    <strong>Nama</strong>
                                    <h5>{customer.name}</h5>
                                </div>
                            </div>
                            <div class="list-group-item list-group-item-action ">
                                <div className="d-flex flex-column">
                                    <strong>Email</strong>
                                    <h5>{customer.email}</h5>
                                </div>
                            </div>
                            <div class="list-group-item list-group-item-action ">
                                <div className="d-flex flex-column">
                                    <strong>No. Whatsapp</strong>
                                    <h5>{customer.no_ponsel}</h5>
                                </div>
                            </div>
                            <div class="list-group-item list-group-item-action ">
                                <div className="d-flex flex-column">
                                    <strong>Alamat</strong>
                                    <h5>{customer.pelanggan.alamat}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
