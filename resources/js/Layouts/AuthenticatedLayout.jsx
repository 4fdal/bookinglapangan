import React from "react";
import { Link, router } from "@inertiajs/react";
import AlertMazer from "@/Components/AlertMazer";
import Breadcrumb from "@/Components/Breadcrumb";
import { classList } from "@/Helpers/GlobalHelpers";

const menus = [
    {
        label: "Dashboard",
        icon: "bi-grid-fill",
        link: route("admin.dashboard"),
    },
    {
        label: "Pemesanan",
        icon: "bi-cup-hot",
        link: route("admin.pemesanan.index"),
    },
    {
        label: "Kalender",
        icon: "bi-calendar-week",
        link: route("admin.schedule.index"),
    },
    {
        label: "Lapangan",
        icon: "bi-pin-map",
        link: route("admin.lapangan.index"),
    },
    {
        label: "Pelanggan",
        icon: "bi-person",
        link: route("admin.pelanggan.index"),
    },
];

export default function AuthenticatedLayout({
    user,
    header,
    headerRight,
    children,
    back,
    message,
    dataBreadcrumb = [],
}) {
    const [navbarActive, setNavbarActive] = React.useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    const getActiveMenuItem = (link = "") => {
        return location.href.toLowerCase().indexOf(link.toLowerCase()) != -1;
    };

    return (
        <div id="app">
            <AlertMazer {...message} />
            <div id="main" className="layout-horizontal">
                <header className="mb-2">
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
                                                href={route(
                                                    "admin.profile.edit"
                                                )}
                                            >
                                                Akun Saya
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Pengaturan
                                            </a>
                                        </li> */}
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
                                    onClick={() =>
                                        setNavbarActive(!navbarActive)
                                    }
                                    className="burger-btn d-block d-xl-none"
                                >
                                    <i className="bi bi-justify fs-3" />
                                </a>
                            </div>
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
                                {menus.map((menuItem) => (
                                    <li
                                        className={classList({
                                            "menu-item": true,
                                            active: getActiveMenuItem(
                                                menuItem.link
                                            ),
                                        })}
                                    >
                                        <Link
                                            href={menuItem.link}
                                            className={classList({
                                                "menu-link": true,
                                            })}
                                        >
                                            <span>
                                                <i
                                                    className={`bi ${menuItem.icon}`}
                                                />{" "}
                                                {menuItem.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="content-wrapper container">
                    <Breadcrumb data={dataBreadcrumb} />

                    <div className="page-heading my-2">
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
