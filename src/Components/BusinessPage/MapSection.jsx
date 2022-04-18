import React, { useState, useRef, useMemo, useEffect } from "react";
import { ScaleControl } from "react-leaflet";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import { Container } from "react-bootstrap";
import { BiMapPin } from "react-icons/bi";
import * as MapEventHandlers from "../Map/MapEventHandlers";
import easyButton from "leaflet-easybutton";

function MapSection({ data }) {
  const defaultZoom = 12;
  const businessLocation = [data.address.lat, data.address.lng || 15];
  const { BaseLayer } = LayersControl;

  return (
    <>
      <Container className="map-section">
        <p>
          <BiMapPin className="mx-2" />
          LOCATION
        </p>
        <MapContainer
          fullscreenControl={true}
          center={businessLocation}
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
          <ZoomControl position="topright" />
          <ScaleControl position="bottomright" />
          <MapEventHandlers.LocateUserPosition />
          <MapEventHandlers.LocateStorePosition
            coordinates={businessLocation}
            businessName={data.businessname}
          />
        </MapContainer>
      </Container>
    </>
  );
}

export default MapSection;
