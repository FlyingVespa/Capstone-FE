import React, { useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import shoplogo from "../../../assets/logo/shop.png";
// import L from "leaflet";
// import { BiMapPin } from "react-icons/bi";

function MapDetails({ address }) {
  let latitude = address?.lat || 37;
  let longitude = address?.lng || 15;

  const defaultZoom = 14;
  const defaultCenter = [latitude, longitude];

  const mapRef = useRef();
  const { BaseLayer } = LayersControl;
  // var century21icon = L.icon({
  //   iconUrl: "https://i.ibb.co/sJrMTdz/favicon-32x32.png",
  //   iconSize: [20, 20],
  // });

  return (
    <>
      <MapContainer
        ref={mapRef}
        fullscreenControl={true}
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: 250, width: "100%" }}
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
        <Marker position={defaultCenter}>
          <Popup>
            <p className="text-center m-0 p-0">
              {address?.street_number}
              {address?.street_name}, {address?.city}, {address?.state},{" "}
              {address?.country}
            </p>
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </>
  );
}

export default MapDetails;
