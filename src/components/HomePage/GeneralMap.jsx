import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import * as L from "leaflet";
import { Container, Button, Form, Row, Nav } from "react-bootstrap";

import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import { BiMapPin } from "react-icons/bi";
import * as MapEventHandlers from "../Map/MapEventHandlers";

const URL = process.env.REACT_APP_API_URL;

function GeneralMap({ companies, searchCategory }) {
  const defaultZoom = 12;
  const { BaseLayer } = LayersControl;
  const loggedInUser = useSelector((s) => s.users.loggedUser);
  const loggedin = useSelector((s) => s.users.loggedin);

  return (
    <>
      <Container className="general-map">
        <MapContainer
          center={[48.856614, 2.3522219]}
          zoom={defaultZoom}
          animate={true}
          fullscreenControl={true}
          zoomControl={false}
          className="general-map-1"
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
          {companies &&
            companies.map((item) =>
              item.address.lat && item.address.lng ? (
                <Marker position={[item.address.lat, item.address.lng]}>
                  <Popup>
                    <span>{item.businessname}</span>
                    <span>{item.category}</span>
                    <Nav.Link href={`/business/${item._id}`}>
                      Visit store
                    </Nav.Link>
                  </Popup>
                </Marker>
              ) : null
            )}
          <ZoomControl position="topright" />
          <EsriLeafletGeoSearch
            position="topleft"
            useMapBounds={true}
            eventHandlers={{
              requeststart: () => console.log("Started request..."),
              requestend: () => console.log("Ended request..."),
              results: (r) => console.log(r),
            }}
          />
          <MapEventHandlers.LocateUserPosition />
          <MapEventHandlers.FlyToLocationOnLoad />
        </MapContainer>
      </Container>
    </>
  );
}

export default GeneralMap;
