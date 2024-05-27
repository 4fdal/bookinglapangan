import React from "react";
import { Link, router } from "@inertiajs/react";
import AlertMazer from "@/Components/AlertMazer";
import Breadcrumb from "@/Components/Breadcrumb";
import { classList } from "@/Helpers/GlobalHelpers";
import CustomerDropdown from "@/Components/CustomerDropdown";

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
                                <Link href={route("admin.dashboard")}>
                                    <img
                                        src="/assets/static/images/logo/logo.png"
                                        alt="Logo"
                                    />
                                </Link>
                            </div>
                            <div className="header-top-right">
                                <CustomerDropdown
                                    onLogout={handleLogout}
                                    user={user}
                                />
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
