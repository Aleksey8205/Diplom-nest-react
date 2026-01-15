import Map from "../../../public/map.png"
import "./style/map.css"

const MapLibrary = () => {
    return(
        <>
        <div className="map-library">
        <h2>Библиотеки Москвы</h2>
        <img className="map" src={Map} alt="" />
        </div>
        </>
    )
}

export default MapLibrary;