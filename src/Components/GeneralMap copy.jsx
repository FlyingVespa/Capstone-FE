import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
  useMap,
  useMapEvents,
  useMapEvent,
} from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import { Container, Button } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import { L, LatLng } from "leaflet";
import { BiMapPin } from "react-icons/bi";

const URL = process.env.REACT_APP_API_URL;

function GeneralMap() {
  const defaultZoom = 4;
  const mapRef = useRef();

  const { BaseLayer } = LayersControl;

  const [defaultPosition, setDefaultPosition] = useState([
    15.6002793, 38.2611553,
  ]);
  const [browserPosition, setbrowserPosition] = useState(null);

  const loggedInUser = useSelector((s) => s.users.loggedUser);
  const loggedin = useSelector((s) => s.users.loggedin);

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    let crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setDefaultPosition([crd.latitude, crd.longitude]);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Error in locating your location ", err.message);
  }

  // useEffect(() => {
  //   checkifLoggedIn();
  // }, []);

  const checkifLoggedIn = () => {
    if (loggedin === true && loggedInUser.address) {
      let { lat, lng } = loggedInUser.address;
      setPosition([lat, lng]);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, [options]);
    }
  };

  const Search = () => {
    const map = useMap();
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  };
  function MyComponent() {
    const map = useMap();
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setDefaultPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);

    return defaultPosition == null ? null : (
      <Marker position={defaultPosition}>
        <Popup>Location Me</Popup>
      </Marker>
    );
  }

  return (
    <>
      <Container>
        <p>
          <BiMapPin className="mx-2" />
          LOCATION
        </p>

        <Button onClick={MyComponent}>LocateMe</Button>
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={defaultZoom}
          style={{ height: 400, width: "100%" }}
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

          <ZoomControl position="bottomright" />

          <Search provider={new OpenStreetMapProvider()} />

          <MyComponent />
        </MapContainer>

        {defaultPosition !== null && (
          <p>Browser Positions:{defaultPosition.toString()}</p>
        )}
      </Container>
    </>
  );
}

export default GeneralMap;
