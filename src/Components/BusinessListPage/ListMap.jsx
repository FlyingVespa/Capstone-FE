import React, { useState, useEffect, useRef } from "react";

import {
  Map,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";

const ListMap = () => {
  const [zoom, setZoom] = useState(11);
  const [statuss, setStatuss] = useState({
    latitude: 37.4767616,
    longitude: 14.3949824,
    error: null,
  });
  const [center, setCenter] = useState([38.2395, 15.4388]);

  const defaultZoom = 10;
  const defaultCenter = [43.0, -79.0];

  const mapRef = useRef();
  const { BaseLayer } = LayersControl;
  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.locate({
      setView: true,
    });
  }, []);

  return (
    <>
      <Map
        ref={mapRef}
        fullscreenControl={true}
        className="map"
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        style={{ height: 550, width: "100%" }}
        zoomControl={false}
      >
        <LayersControl>
          <BaseLayer selected name="S">
            <TileLayer
              attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer selected name="Standard">
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

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </Map>
    </>
  );
};

export default ListMap;
