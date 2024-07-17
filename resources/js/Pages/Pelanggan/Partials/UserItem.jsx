import User from "@/Models/user";
import { Link } from "@inertiajs/react";

/**
 *
 *
 * @export
 * @param {{ user : User }} { user }
 * @return {*}
 */
export default function UserItem({ user }) {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-body">
                    <h5 className="card-title ">
                        <Link
                            href={route("admin.pelanggan.show", {
                                user_id: user.id,
                            })}
                        >
                            {user.name}
                        </Link>
                    </h5>
                    <div className="d-flex flex-column">
                        <strong>Email </strong>
                        <p className="mb-0">{user.email}</p>
                    </div>
                    <div className="d-flex flex-column">
                        <strong>No. Whatsapp </strong>
                        <p className="mb-0">{user.no_ponsel}</p>
                    </div>
                    <div className="d-flex flex-column">
                        <strong>Alamat </strong>
                        <p className="mb-0">{user.pelanggan?.alamat ?? null}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
