import AlertMazer from "@/Components/AlertMazer";
import Breadcrumb from "@/Components/Breadcrumb";
import CustomerDropdown from "@/Components/CustomerDropdown";
import { classList } from "@/Helpers/GlobalHelpers";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

export default function CustomerLayout({
    user,
    header,
    headerRight,
    children,
    back,
    message,
    headerChildren,
    dataBreadcrumb = [],
}) {
    const [navbarActive, setNavbarActive] = React.useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <div id="app">
            <Head title="Sewa Lapangan" />
            <AlertMazer {...message} />
            <div id="main" className="layout-horizontal">
                <header>
                    <div className="header-top">
                        <div className="container">
                            <div className="logo">
                                <Link href={route("welcome")}>
                                    <img
                                        src="/assets/static/images/logo/logo.png"
                                        alt="Logo"
                                    />
                                </Link>
                            </div>

                            <CustomerDropdown
                                onLogout={handleLogout}
                                user={user}
                            />

                            {/* Burger button responsive */}
                            <a
                                onClick={() => setNavbarActive(!navbarActive)}
                                href="#"
                                className="burger-btn d-block d-xl-none"
                            >
                                <i className="bi bi-justify fs-3" />
                            </a>
                        </div>
                    </div>
                    <nav
                        className={classList({
                            "main-navbar": true,
                            active: navbarActive,
                            "bg-primary": true,
                        })}
                    >
                        <div className="container">
                            <ul>
                                <li className="menu-item active">
                                    <a
                                        href={route("welcome")}
                                        className="menu-link"
                                    >
                                        <span>
                                            <i className="bi bi-pin-map" /> Sewa
                                            Lapangan
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                {headerChildren}

                <div className="content-wrapper container ">
                    <Breadcrumb data={dataBreadcrumb} />

                    {header && (
                        <div className="page-heading mb-0">
                            <div className="d-flex justify-content-between">
                                <h3>
                                    {back && (
                                        <Link
                                            href={back}
                                            className="btn btn-ghost"
                                        >
                                            <i className="bi bi-arrow-left"></i>
                                        </Link>
                                    )}
                                    {header}
                                </h3>
                                {headerRight}
                            </div>
                        </div>
                    )}

                    {children}
                </div>

                <footer>
                    <div className="container">
                        <div className="footer clearfix mb-0 text-muted">
                            <div className="float-start">
                                <p>2023 © Mazer</p>
                            </div>
                            <div className="float-end">
                                <p>
                                    Crafted with{" "}
                                    <span className="text-danger">
                                        <i className="bi bi-heart" />
                                    </span>{" "}
                                    by <a href="https://saugi.me">Saugi</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
