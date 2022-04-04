import { useEffect, useState } from "react";
import Locate from "leaflet.locatecontrol";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import easyButton from "leaflet-easybutton";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from "leaflet";

import pin from "../../assets/markers/placeholder.png";

const myIcon = L.icon({
  iconUrl: pin,
  iconSize: [35, 35],
  // iconAnchor: [32, 64],
});

export function LocateUserPosition() {
  const map = useMap();
  useEffect(() => {
    L.control
      .locate({
        position: "topleft",
        enableHighAccuracy: true,
        locateOptions: { maxZoom: 14 },
        cacheLocation: true,
      })
      .addTo(map);
  }, []);

  return null;
}

export function FlyToLocationOnLoad() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom(), 10);
    });
  }, []);

  return null;
}

export function LocateStorePosition({ coordinates, businessName }) {
  const [position, setPosition] = useState(null);
  const map = useMap();
  let markerOptions = {};
  var marker = new L.Marker(coordinates, markerOptions).bindPopup(businessName);
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    });
  }, []);
  useEffect(() => {
    L.easyButton("fa-shopping-basket", function () {
      map.setView(coordinates, 12);
      marker.addTo(map);
    }).addTo(map);
  }, []);
  useEffect(() => {
    let bb = [coordinates, position];
    L.easyButton("fa-globe", function () {
      map.fitBounds(bb);
    }).addTo(map);
  }, []);
  return null;
}
