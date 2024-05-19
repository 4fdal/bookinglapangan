import { classList } from "@/Helpers/GlobalHelpers";

export default function ModalImage({
    open = false,
    title = "",
    source = "#",
    onClose = () => { },
}) {
    return (
        <>
            <div
                className={classList({
                    modal: open,
                    fade: open,
                    show: open,
                })}
                id="galleryModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="galleryModalTitle"
                style={{ display: open ? "block" : "none", paddingLeft: 0 }}
                aria-modal="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="galleryModalTitle">
                                {title}
                            </h5>
                            <button
                                onClick={onClose}
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x"
                                >
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img className="d-block w-100" src={source} />
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={onClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={classList({
                    "modal-backdrop": open,
                    fade: open,
                    show: open,
                })}
            ></div>
        </>
    );
}
