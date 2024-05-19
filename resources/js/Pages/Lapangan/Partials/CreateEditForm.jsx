import InputImage from "@/Components/InputImage";
import { currency } from "@/Helpers/GlobalHelpers";
import { useForm } from "@inertiajs/react";

export default function CreateEditForm({ onSubmit = (e, post) => { }, defaultData = { images: [], nama, harga_per_jam, lokasi, deskripsi } }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        images: defaultData.images,
        nama: defaultData.nama,
        harga_per_jam: defaultData.harga_per_jam,
        lokasi: defaultData.lokasi,
        deskripsi: defaultData.deskripsi,
    });

    const handleSubmit = (e) => {
        onSubmit(e, data)
    }

    return <form onSubmit={handleSubmit}>
        <div className="card">
            <div className="card-body">
                <InputImage
                    files={data.images}
                    onChange={(files) => setData("images", files)}
                />

                <h6>Nama Lapanangan</h6>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control ${errors.nama ? "is-invalid" : ""
                            }`}
                        value={data.nama}
                        onChange={(e) =>
                            setData("nama", e.target.value)
                        }
                        placeholder="Nama Laparangan"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-pin-map" />
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.nama}
                    </div>
                </div>

                <h6>
                    Harga Perjam ( {currency(data.harga_per_jam)} /Jam )
                </h6>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control ${errors.harga_per_jam ? "is-invalid" : ""
                            }`}
                        value={data.harga_per_jam}
                        onChange={(e) =>
                            setData(
                                "harga_per_jam",
                                e.target.value
                                    ?.toString()
                                    ?.replace(/[^0-9]/g, "")
                            )
                        }
                        placeholder="Harga Perjam (Rp. )"
                    />
                    <div className="form-control-icon">Rp.</div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.harga_per_jam}
                    </div>
                </div>

                <h6>Lokasi</h6>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className={`form-control ${errors.lokasi ? "is-invalid" : ""
                            }`}
                        value={data.lokasi}
                        onChange={(e) =>
                            setData("lokasi", e.target.value)
                        }
                        placeholder="Lokasi"
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-geo-alt"></i>
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.lokasi}
                    </div>
                </div>

                <h6>Deskripsi</h6>
                <div className="form-group position-relative has-icon-left mb-4">
                    <textarea
                        className={`form-control ${errors.lokasi ? "is-invalid" : ""
                            }`}
                        onChange={(e) =>
                            setData("deskripsi", e.target.value)
                        }
                        placeholder="Deskripsi"
                    >
                        {data.deskripsi}
                    </textarea>
                    <div className="form-control-icon">
                        <i className="bi bi-body-text"></i>
                    </div>
                    <div class="invalid-feedback">
                        <i class="bx bx-radio-circle"></i>
                        {errors.deskripsi}
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-primary">
                    <i className="bi bi-floppy"></i>
                    {` Simpan`}
                </button>
            </div>
        </div>
    </form>
}