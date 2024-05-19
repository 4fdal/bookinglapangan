import { classList } from "@/Helpers/GlobalHelpers"
import React from "react"

export function ImageView({ source, active }) {
    return <div className={classList({
        'carousel-item': true,
        'active': active,
    })} >
        <div style={{
            backgroundImage: `url(${source})`,
            height: '250px',
            backgroundSize: 'cover',
            backgroundPositionY: 'center'
        }} className="d-block w-100" ></div>
    </div>
}


export default function Carousel({ sources = [] }) {


    const [activeCarouselItemIndex, setActiveCarouselItemIndex] = React.useState(0)


    const handleClickPrev = (e) => {
        e.preventDefault()
        let sourceMinLength = 0
        let sourceMaxLength = sources.length - 1
        let currentActiveCarouselItemIndex = activeCarouselItemIndex - 1
        if (currentActiveCarouselItemIndex < sourceMinLength) {
            currentActiveCarouselItemIndex = sourceMaxLength
        }


        setActiveCarouselItemIndex(currentActiveCarouselItemIndex)
    }

    const handleClickNext = (e) => {
        e.preventDefault()
        let sourceMinLength = 0
        let sourceMaxLength = sources.length - 1
        let currentActiveCarouselItemIndex = activeCarouselItemIndex + 1
        if (currentActiveCarouselItemIndex > sourceMaxLength) {
            currentActiveCarouselItemIndex = sourceMinLength
        }
        setActiveCarouselItemIndex(currentActiveCarouselItemIndex)
    }

    return <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            {sources.map((source, index) => <ImageView key={'carousel-item-' + index} source={source} active={index == activeCarouselItemIndex} />)}
        </div>
        <a className="carousel-control-prev" onClick={handleClickPrev} role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" onClick={handleClickNext} role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </a>
    </div>
}