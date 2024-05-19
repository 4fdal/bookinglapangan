import { Link } from "@inertiajs/react";

export default function UserDropdown({ user, onLogout }) {
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
                                className="dropdown-item"
                                href={route("profile.edit")}
                            >
                                Akun Saya
                            </Link>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Pengaturan
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" onClick={onLogout}>
                                Keluar
                            </a>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="d-flex">
                    <Link href={route("login")} className="btn text-primary">
                        Login
                    </Link>
                    <div class="vr"></div>
                    <Link href={route("register")} className="btn text-primary">
                        Register
                    </Link>
                </div>
            )}

            {/* Burger button responsive */}
            <a href="#" className="burger-btn d-block d-xl-none">
                <i className="bi bi-justify fs-3" />
            </a>
        </div>
    );
}
