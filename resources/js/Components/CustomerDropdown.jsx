import { Link } from "@inertiajs/react";

export default function CustomerDropdown({ user, onLogout }) {
    return (
        <div className="header-top-right">
            {user ? (
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
                            <h6 className="user-dropdown-name">{user.name}</h6>
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
                                className="dropdown-item text-primary d-flex flex-row justify-content-between"
                                href={route("customer.pemesanan.index")}
                            >
                                <span>
                                    <i className="bi bi-cart"></i>
                                    &nbsp;Cart
                                </span>
                                <span className="badge bg-primary">
                                    {user.cart}
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="dropdown-item text-primary d-flex flex-row justify-content-between"
                                href={route("customer.pemesanan.riwayat.index")}
                            >
                                <span>
                                    <i className="bi bi-clock-history"></i>
                                    &nbsp;Riwayat Pemesanan
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="dropdown-item text-primary"
                                href={route("customer.profile.edit")}
                            >
                                <i className="bi bi-people"></i>
                                &nbsp;Akun Saya
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" onClick={onLogout}>
                                <i className="bi bi-logout"></i>
                                &nbsp; Keluar
                            </a>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="d-flex">
                    <Link href={route("login")} className="btn text-primary">
                        Login
                    </Link>
                    <div className="vr"></div>
                    <Link href={route("register")} className="btn text-primary">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}
