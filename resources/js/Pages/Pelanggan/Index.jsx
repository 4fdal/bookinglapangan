import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import UserItem from "./Partials/UserItem";
import User from "@/Models/user";
import { SeachForm } from "./Partials/SeachForm";

export default function Index({ auth: { user }, message, data }) {
    const handleSearchSubmit = (e, { namaPelanggan }) => {
        router.get(
            route("admin.pelanggan.index", {
                nama: namaPelanggan,
            })
        );
    };

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

            <div className="card mb-2">
                <div className="card-content ">
                    <div className="card-body p-2">
                        <SeachForm onSubmit={handleSearchSubmit} />
                    </div>
                </div>
            </div>

            <div className="row">
                {data.data.map((item, index) => {
                    return (
                        <div className="col-md-4" key={"user-item-" + index}>
                            <UserItem user={new User(item)} />
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
