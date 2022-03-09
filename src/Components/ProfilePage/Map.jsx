import React, { useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import { Container } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiMapPin } from "react-icons/bi";

function Map({ address, data }) {
  let latitude = address?.lat || 43;
  let longitude = address?.lon || -79;

  const defaultZoom = 16;
  const defaultCenter = [latitude, longitude];
  const businessLocation = [latitude, longitude];
  const mapRef = useRef();
  const { BaseLayer } = LayersControl;

  // function handleOnLocationFound(event) {
  //   const { current = {} } = mapRef;
  //   const { leafletElement: map } = current;

  //   const latlng = event.latlng;
  //   const radius = event.accuracy;
  //   const circle = L.circle(latlng, radius);

  //   circle.addTo(map);
  // }
  // function handleOnLocationError(error) {
  //   alert(`Unable to determine location: ${error.message}`);
  // }
  return (
    <>
      <Container>
        <p>
          <BiMapPin className="mx-2" />
          LOCATION
        </p>
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
            <Popup>
              <p className="m-0 p-0 text-center fw-bold">{data.businessname}</p>
              <p className="text-center m-0 p-0">
                {address?.street_number}
                {address?.street_name}, {address?.city}, {address?.state},{" "}
                {address?.country}
              </p>
            </Popup>
          </Marker>
          <ZoomControl position="bottomright" />
        </MapContainer>
      </Container>
    </>
  );
}

export default Map;
