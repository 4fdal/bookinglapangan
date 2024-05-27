import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        no_ponsel: "",
        password: "",
        password_confirmation: "",
        accept: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <h1 className="auth-title">Daftar</h1>
            <p className="auth-subtitle mb-5">
                Input your data to register to our website.
            </p>
            <form onSubmit={submit}>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control form-control-xl ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Nama"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-person" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.name}
                    </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control form-control-xl ${
                            errors.no_ponsel ? "is-invalid" : ""
                        }`}
                        value={data.no_ponsel}
                        onChange={(e) => setData("no_ponsel", e.target.value)}
                        placeholder="No. Hp"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-phone" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.no_ponsel}
                    </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control form-control-xl ${
                            errors.email ? "is-invalid" : ""
                        }`}
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Email"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-envelope" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.email}
                    </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="password"
                        className={`form-control form-control-xl ${
                            errors.password ? "is-invalid" : ""
                        }`}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Password"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-shield-lock" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.password}
                    </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="form-control form-control-xl"
                        placeholder="Confirm Password"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-shield-lock" />
                    </div>
                </div>
                <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                    Daftar
                </button>
            </form>
            <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link href={route('login')} className="font-bold">
                        Log in
                    </Link>
                    .
                </p>
            </div>
        </GuestLayout>
    );
}
