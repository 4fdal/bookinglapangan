import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-5 col-12">
                    <div id="auth-left">
                        <div className="auth-logo">
                            <Link href={route("welcome")}>
                                <img
                                    src="./assets/compiled/svg/logo.svg"
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>
                <div className="col-lg-7 d-none d-lg-block">
                    <div id="auth-right"></div>
                </div>
            </div>
        </div>
    );
}
