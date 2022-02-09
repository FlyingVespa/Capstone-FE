import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function Map({ location, data }) {
  const [zoom, setZoom] = useState(11);
  // let map = L.map("map");
  let latitude = location?.lat || 43;
  let longitude = location?.lon || -79;

  const [position, setPosition] = useState(null);

  const defaultZoom = 16;
  const defaultCenter = [latitude, longitude];
  const businessLocation = [latitude, longitude];
  const mapRef = useRef();
  const { BaseLayer } = LayersControl;

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    // map.on("locationfound", handleOnLocationFound);
    // map.on("locationerror", handleOnLocationError);

    // map.off("locationfound", handleOnLocationFound);
    // map.off("locationerror", handleOnLocationError);
    // };
  }, []);

  function handleOnLocationFound(event) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    const latlng = event.latlng;
    const radius = event.accuracy;
    const circle = L.circle(latlng, radius);

    circle.addTo(map);
  }
  function handleOnLocationError(error) {
    alert(`Unable to determine location: ${error.message}`);
  }
  return (
    <>
      {/* <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer> */}
      <MapContainer
        ref={mapRef}
        fullscreenControl={true}
        className="map"
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        style={{ height: 400, width: "100%" }}
        zoomControl={false}
        className="leaflet-container"
      >
        <LayersControl>
          <BaseLayer checked name="Standard">
            <TileLayer
              attribution='"<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"'
              url="https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=tRBS1CzZ2FJZHZdJSwLZkXk5bxihDxtkAGacqcXduKRXEbrgXvFAERqPDxwhWS63"
            />
          </BaseLayer>
          <BaseLayer name="Black and White">
            <TileLayer
              attribution='"<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"'
              url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=tRBS1CzZ2FJZHZdJSwLZkXk5bxihDxtkAGacqcXduKRXEbrgXvFAERqPDxwhWS63"
            />
          </BaseLayer>
        </LayersControl>
        <Marker position={businessLocation}>
          <Popup>{data.businessname}</Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
}

export default Map;
