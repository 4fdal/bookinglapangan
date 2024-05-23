import React from "react";

export default function CreateForm({
    errors = {},
    nama = null,
    email = null,
    no_ponsel = null,
    alamat = null,
}) {
    const [txtNama, setNama] = React.useState(nama);
    const [txtEmail, setEmail] = React.useState(email);
    const [txtNoPonsel, setNoPonsel] = React.useState(no_ponsel);
    const [txtAlamat, setAlamat] = React.useState(alamat);

    return (
        <div className="row">
            <div className="col-md-12">
                <h6>Nama</h6>
                <div className="form-group position-relative has-icon-left mb-3">
                    <input
                        type="text"
                        className={`form-control ${
                            errors.nama ? "is-invalid" : ""
                        }`}
                        value={null}
                        onChange={(e) => {}}
                        placeholder="Nama Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-person" />
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.nama}
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
                        value={null}
                        onChange={(e) => {}}
                        placeholder="Email Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-envelope-at" />
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
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
                            errors.email ? "is-invalid" : ""
                        }`}
                        value={null}
                        onChange={(e) => {}}
                        placeholder="No. Whatsapp Pelanggan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-whatsapp" />
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.email}
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
                        onChange={(e) => {}}
                        placeholder="Alamat Pelanggan"
                    ></textarea>
                    <div className="form-control-icon">
                        <i className="bi bi-house" />
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.email}
                    </div>
                </div>
            </div>
        </div>
    );
}
