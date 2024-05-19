import React from "react";
import ModalImage from "./ModalImage";

export default function InputImage({ onChange = (files) => { }, files }) {
    const inputFile = React.useRef();
    const [images, setImages] = React.useState([]);
    const [sources, setSources] = React.useState([]);
    const [modalImage, setModalImage] = React.useState({
        open: false,
        title: "",
        source: "#",
    });

    const openModalImage = ({ title, source }) => {
        setModalImage({ open: true, title, source });
    };

    const closeModalImage = () => {
        setModalImage({ open: false, title: "", source: "#" });
    };

    const handleClickUploadImage = () => {
        var file = inputFile.current;
        file.click();
    };

    const handleFileChange = (e) => {
        const imagechanges = [...images, ...e.target.files];
        setImages(imagechanges);
        setSources([
            ...imagechanges.map((image) => URL.createObjectURL(image)),
        ]);
    };

    const handleLoadFileToImageSources = async () => {
        if (images.length == 0 && sources.length == 0) {
            let newImages = [];
            let newSources = [];
            for (const imageFile of files) {
                try {
                    const res = await fetch(`/storage/${imageFile.path}`)
                    const blob = await res.blob()
                    const file = new File([blob], imageFile.originalName, { type: imageFile.meme })
                    newImages.push(file)
                    newSources.push(URL.createObjectURL(file))
                } catch (error) {
                    console.error("[error] Load blob urls prop files", error.message)
                }
            }

            setImages([...newImages])
            setSources([...newSources])
        }
    }

    React.useEffect(() => {
        onChange(images);
    }, [images]);

    React.useEffect(() => {
        handleLoadFileToImageSources()
    }, [])

    const renderImage = (image, index) => {
        const source = sources[index];

        const handleDeleteSource = () => {
            setImages([
                ...images.filter((_, filterIndex) => filterIndex != index),
            ]);
        };

        const handleShowImage = () => {
            openModalImage({ title: image.name, source });
        };

        return (
            <div className="col-md-3 mb-3" key={`image-${index}`}>
                <div
                    style={{
                        backgroundImage: `url(${source})`,
                        width: "100%",
                        height: "200px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderWidth: "2px",
                        borderStyle: "dashed",
                        borderColor: "gray",
                        borderRadius: "20px",
                    }}
                >
                    <div className="d-flex justify-content-end">
                        <button
                            onClick={handleDeleteSource}
                            type="button"
                            className="btn btn-ghost"
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "15%",
                        }}
                    >
                        <button
                            onClick={handleShowImage}
                            type="button"
                            className="btn btn-secondary rounded-circle"
                        >
                            <i className="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mb-3">
            <ModalImage
                {...modalImage}
                onClose={() => {
                    closeModalImage();
                }}
            />

            <div className="row">{images.map(renderImage)}</div>

            <input
                accept="image/*"
                ref={inputFile}
                onChange={handleFileChange}
                type="file"
                className="d-none"
                multiple
            />
            <button
                type="button"
                onClick={handleClickUploadImage}
                className="btn btn-primary"
            >
                <i className="bi bi-image"></i>
                {" Upload Gambar"}
            </button>
        </div>
    );
}
