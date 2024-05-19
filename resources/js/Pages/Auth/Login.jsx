import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <h1 className="auth-title">Masuk</h1>
            <p className="auth-subtitle mb-5">
                Input your data to register to our website.
            </p>
            <form onSubmit={submit}>
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
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
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
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.password}
                    </div>
                </div>

                <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                    Masuk
                </button>
            </form>
            <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link href={route("register")} className="font-bold">
                        Daftar
                    </Link>
                    .
                </p>
                {/* <p>
                    <a className="font-bold" href="auth-forgot-password.html">
                        Forgot password?
                    </a>
                    .
                </p> */}
            </div>
        </GuestLayout>
    );
}
