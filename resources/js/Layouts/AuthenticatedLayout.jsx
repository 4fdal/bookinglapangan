import React from "react";
import { Link, router } from "@inertiajs/react";
import AlertMazer from "@/Components/AlertMazer";

export default function AuthenticatedLayout({
    user,
    header,
    headerRight,
    children,
    back,
    message,
}) {

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };


    return (
        <div id="app">
            <AlertMazer {...message} />
            <div id="main" className="layout-horizontal">
                <header className="mb-5">
                    <div className="header-top">
                        <div className="container">
                            <div className="logo">
                                <a href="index.html">
                                    <img
                                        src="/assets/compiled/svg/logo.svg"
                                        alt="Logo"
                                    />
                                </a>
                            </div>
                            <div className="header-top-right">
                                <div className="dropdown">
                                    <a
                                        href="#"
                                        id="topbarUserDropdown"
                                        className="user-dropdown d-flex align-items-center dropend dropdown-toggle "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className="avatar avatar-md2">
                                            <img
                                                src="/assets/compiled/jpg/1.jpg"
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className="text">
                                            <h6 className="user-dropdown-name">
                                                {user.name}
                                            </h6>
                                            <p className="user-dropdown-status text-sm text-muted">
                                                {user.email}
                                            </p>
                                        </div>
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end shadow-lg"
                                        aria-labelledby="topbarUserDropdown"
                                    >
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={route("profile.edit")}
                                            >
                                                Akun Saya
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Pengaturan
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                Keluar
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Burger button responsive */}
                                <a
                                    href="#"
                                    className="burger-btn d-block d-xl-none"
                                >
                                    <i className="bi bi-justify fs-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <nav className="main-navbar">
                        <div className="container">
                            <ul>
                                <li className="menu-item  ">
                                    <a href="index.html" className="menu-link">
                                        <span>
                                            <i className="bi bi-grid-fill" />{" "}
                                            Dashboard
                                        </span>
                                    </a>
                                </li>
                                <li className="menu-item  ">
                                    <a href="index.html" className="menu-link">
                                        <span>
                                            <i className="bi bi-cup-hot" />{" "}
                                            Pemesanan
                                        </span>
                                    </a>
                                </li>
                                <li className="menu-item  ">
                                    <Link
                                        href={route("lapangan.index")}
                                        className="menu-link"
                                    >
                                        <span>
                                            <i className="bi bi-pin-map" />{" "}
                                            Lapangan
                                        </span>
                                    </Link>
                                </li>
                                <li className="menu-item  ">
                                    <a href="index.html" className="menu-link">
                                        <span>
                                            <i className="bi bi-people" />{" "}
                                            Pelanggan
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="content-wrapper container">
                    <div className="page-heading ">
                        <div className="d-flex justify-content-between">
                            <h3>
                                {back && (
                                    <Link href={back} className="btn btn-ghost">
                                        <i className="bi bi-arrow-left"></i>
                                    </Link>
                                )}
                                {header}
                            </h3>
                            {headerRight}
                        </div>
                    </div>

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
