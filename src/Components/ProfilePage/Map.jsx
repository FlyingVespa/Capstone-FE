import React, { useState, useRef, useMemo, useEffect } from "react";
import { ScaleControl } from "react-leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
  FeatureGroup,
  useMap,
  useMapEvents,
  useMapEvent,
  AttributionControl,
} from "react-leaflet";
import { Container } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiMapPin } from "react-icons/bi";
import LocateStore from "./LocateStore";
import UserLocate from "./UserLocate";

function Map({ data }) {
  const [userPosition, setUserPosition] = useState([]);
  const defaultZoom = 10;
  const businessLocation = [15, 38];
  const { BaseLayer } = LayersControl;

  function SetBoundsRectangles() {
    const map = useMap();

    let markerOptions1 = {
      riseOnHover: true,
      keyboard: true,
    };

    useEffect(() => {
      let one = L.marker(businessLocation, markerOptions1)
        .bindPopup(data.businessname)
        .openPopup();
      one.addTo(map);
    }, []);
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      function showPosition(position) {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        let two = L.marker([
          position.coords.latitude,
          position.coords.longitude,
        ]).bindTooltip("Your Location", markerOptions1);
        two.addTo(map);
      }
    }, []);

    return null;
  }

  function MapBounds() {
    const map = useMap();
    let bounds = L.latLngBounds(
      L.latLng(businessLocation),
      L.latLng(userPosition)
    );
    map.fitBounds([bounds]);
  }

  function LocateBusiness() {
    const map = useMap();
    const locateOptions = {
      drawCircle: true,
      position: "topleft",
      setView: "once",
      flyTo: true,
      cacheLocation: true,
      enableHighAccuracy: true,
      showPopup: true,
      initialZoomLevel: 12,
    };

    // L.control.flyTo().addTo(map);
    let companymarker = L.marker(businessLocation);

    companymarker.addTo(map);
    map.flyTo(businessLocation, map.getZoom());
    return null;
  }

  function MyComponent() {
    const map = useMapEvent("click", () => {
      map.setView([50.5, 30.5]);
    });
    return null;
  }

  return (
    <>
      <Container>
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
          {/* <LocateBusiness /> */}
          {/* <MyComponent /> */}
          {/* <SetBoundsRectangles /> */}
          <ZoomControl position="topright" />
          <ScaleControl position="bottomright" />
          <Marker
            position={[50.5, 30.5]}
            eventHandlers={{
              click: () => {
                console.log("marker clicked");
              },
            }}
          />
          {/* <MapBounds /> */}
          <UserLocate />
          <LocateStore
            title={`Locate Store`}
            markerPosition={businessLocation}
            description={data.businessname}
          />
        </MapContainer>
      </Container>
    </>
  );
}

export default Map;
