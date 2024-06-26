import React from "react";

export default function CreateForm({
    errors = {},
    name = null,
    email = null,
    no_ponsel = null,
    alamat = null,
    password = "",
    password_confirmation = "",
    onChange = ({
        name,
        email,
        no_ponsel,
        alamat,
        password,
        password_confirmation,
    }) => {},
}) {
    const handleChange = (key) => (e) => {
        onChange({
            name,
            email,
            no_ponsel,
            alamat,
            password,
            password_confirmation,
            [key]: e.target.value,
        });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <h6>Nama</h6>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="text"
                        className={`form-control ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        value={name}
                        onChange={handleChange("name")}
                        placeholder="Nama Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-person" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.name}
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <h6>Email</h6>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="email"
                        className={`form-control ${
                            errors.email ? "is-invalid" : ""
                        }`}
                        value={email}
                        onChange={handleChange("email")}
                        placeholder="Email Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-envelope-at" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.email}
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <h6 className="my-0">No. Whatsapp</h6>
                <p className="my-0">Pastikan nomor berikut dapat dihubungi</p>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="text"
                        className={`form-control ${
                            errors.no_ponsel ? "is-invalid" : ""
                        }`}
                        value={no_ponsel}
                        onChange={handleChange("no_ponsel")}
                        placeholder="No. Whatsapp Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-whatsapp" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.no_ponsel}
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <h6 className="my-0">Alamat</h6>
                <div className="form-group position-relative has-icon-left mb-3">
                    <textarea
                        type=""
                        className={`form-control ${
                            errors.alamat ? "is-invalid" : ""
                        }`}
                        onChange={handleChange("alamat")}
                        placeholder="Alamat Pelanggan"
                    >
                        {alamat}
                    </textarea>
                    <div className="form-control-icon">
                        <i className="bi bi-house" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.alamat}
                    </div>
                </div>
            </div>

            <hr />
            <div className="col-md-12">
                <h6 className="my-0">Password</h6>
                <p className="my-0">
                    Jika anda tidak mengiginkan untuk mengubah password, biarkan
                    field ini tetap kosong!
                </p>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="password"
                        className={`form-control ${
                            errors.password ? "is-invalid" : ""
                        }`}
                        onChange={handleChange("password")}
                        placeholder="Password"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-key-fill" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.password}
                    </div>
                </div>

                <h6 className="my-0">Konfirmasi Password</h6>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="password"
                        className={`form-control ${
                            errors.password_confirmation ? "is-invalid" : ""
                        }`}
                        onChange={handleChange("password_confirmation")}
                        placeholder="Konfirmasi Password"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-key-fill" />
                    </div>
                    <div className="invalid-feedback">
                        <i className="bx bx-radio-circle"></i>
                        {errors.password_confirmation}
                    </div>
                </div>
            </div>
        </div>
    );
}
