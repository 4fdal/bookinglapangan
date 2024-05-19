import React from "react"

export default function AlertMazer({ type = null, title, message }) {

    const [visible, setVisible] = React.useState(false)
    const [options, setOptions] = React.useState({
        icon: 'bi-star',

    })

    React.useEffect(() => {

        const icons = {
            'primary': 'bi-star',
            'success': 'bi-check-circle',
            'warning': 'bi-exclamation-triangle',
            'danger': 'bi-file-excel',
            'secondary': 'bi bi-star',
            'info': 'bi bi-star',
        }

        setOptions({ icon: icons[type] ?? 'bi-star' })
        setVisible(true)

        const handleTimeout = () => {
            setVisible(false)
        }
        setTimeout(handleTimeout, 5000)
        return () => clearTimeout(handleTimeout)

    }, [type])




    return type && <div style={{ position: 'absolute', zIndex: 99, right: 10, top: 10 }} className={`fade ${visible ? 'show' : 'hidden'}`} >
        <div className={`alert alert-${type} d-flex flex-row`}>
            <i className={`bi ${options.icon}`}></i>
            <div className="d-flex flex-column">
                <h6 className="alert-heading my-0">{title}</h6>
                <p>{message}</p>
            </div>
            <button type="button" style={{ fontSize: 12 }} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

}