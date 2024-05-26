import CustomerLayout from "@/Layouts/CustomerLayout";
import CreateForm from "./Partials/CreateForm";
import User from "@/Models/user";
import React from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth: { user }, message }) {
    const profile = new User(user);

    const [errors, setErrors] = React.useState({});
    const [name, setName] = React.useState(profile.name);
    const [email, setEmail] = React.useState(profile.email);
    const [no_ponsel, setNoPonsel] = React.useState(profile.no_ponsel);
    const [alamat, setAlamat] = React.useState(profile?.pelanggan?.alamat);
    const [password, setPassword] = React.useState("");
    const [password_confirmation, setPasswordConformation] = React.useState("");

    const handleFormChange = ({
        name,
        email,
        no_ponsel,
        alamat,
        password,
        password_confirmation,
    }) => {
        setName(name);
        setEmail(email);
        setNoPonsel(no_ponsel);
        setAlamat(alamat);
        setPassword(password);
        setPasswordConformation(password_confirmation);
    };

    const handleUpdate = () => {
        const dataRequest = {
            name,
            email,
            no_ponsel,
            alamat,
            password,
            password_confirmation,
        };

        setErrors({});
        router.patch(
            route("admin.profile.update", {
                redirect: true,
            }),
            dataRequest,
            {
                onError: setErrors,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            message={message}
            dataBreadcrumb={[
                { label: "Dashboard", link: route("admin.dashboard") },
                { label: "Profile", active: true },
            ]}
            header="Profile"
            back={route("admin.dashboard")}
        >
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <CreateForm
                            onChange={handleFormChange}
                            alamat={alamat}
                            email={email}
                            name={name}
                            no_ponsel={no_ponsel}
                            errors={errors}
                            password={password}
                            password_confirmation={password_confirmation}
                        />
                    </div>
                    <div className="card-footer">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="btn btn-primary"
                        >
                            <i className="bi bi-floppy"></i>
                            &nbsp; Perbarui
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
