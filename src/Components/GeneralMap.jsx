import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLeafletContext } from "@react-leaflet/core";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
  useMapEvents,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import {
  Container,
  Button,
  FormControl,
  Form,
  Row,
  Nav,
} from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import ffff from "../assets/logo/shop.png";
import L, { LeafletMouseEvent } from "leaflet";
import { BiMapPin } from "react-icons/bi";
import Locate from "leaflet.locatecontrol";

const URL = process.env.REACT_APP_API_URL;

function GeneralMap({ companies }) {
  const defaultZoom = 14;
  const mapRef = useRef();
  const { BaseLayer } = LayersControl;
  const [defaultPosition, setDefaultPosition] = useState([
    15.6002793, 38.2611553,
  ]);
  const [searchCategory, setSearchCategory] = useState("business");

  const loggedInUser = useSelector((s) => s.users.loggedUser);
  const loggedin = useSelector((s) => s.users.loggedin);

  const SearchLocation = () => {
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

  function LocateMe() {
    const map = useMap();
    const locateOptions = {
      drawCircle: true,
      position: "topleft",
      setView: "once",
      outOfView: "setView",
      flyTo: true,
      cacheLocation: true,
      enableHighAccuracy: true,
      showPopup: true,
      initialZoomLevel: 15,
    };
    L.control.locate(locateOptions).addTo(map);

    return null;
  }

  // const map = useMap();
  // function getFeaturesInView() {
  //   var features = [];
  //   map.eachLayer(function (layer) {
  //     if (layer instanceof L.Marker) {
  //       if (map.getBounds().contains(layer.getLatLng())) {
  //         features.push(layer.feature);
  //       }
  //     }
  //   });
  //   return features;
  // }

  // const selectSearchCategory = (input) => {
  //   const text = e.target.value.toLowerCase();
  //   switch (searchCategory) {
  //     case "business"

  //     setResult(

  //       companies.filter(input).map(item =>{

  //       })
  //       )
  //       break;
  //     case "product"
  //     function filterProducts(e) {

  //       // console.log(productName[0]);
  //       productName.forEach(function(product) {
  //           const item = product.firstChild.textContent;
  //           if (item.toLowerCase().indexOf(text) != -1) {
  //               product.parentElement.parentElement.style.display = "block"
  //           } else {
  //               product.parentElement.parentElement.style.display = "none"
  //           }
  //       })
  //   }

  //       break;
  //     case "service"

  //       break;

  //     default:
  //       break;
  //   }

  // };
  function handleChange({ target }) {
    setSearchCategory(target.value);
  }
  function handleSubmit(event) {
    alert("Your favorite flavor is: " + searchCategory);
    event.preventDefault();
  }

  return (
    <>
      <Container>
        <p>
          <BiMapPin className="mx-2" />
          LOCATION
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Row>
              <Form.Control type="text" />
              <Form.Select value={searchCategory} onChange={handleChange}>
                <option default value="product">
                  Product
                </option>
                <option value="service">Service</option>
                <option value="business">Business</option>
              </Form.Select>
              <Button>Search</Button>
            </Row>
          </Form.Group>
        </Form>
        <p>{searchCategory}</p>
        <MapContainer
          ref={mapRef}
          center={[48.856614, 2.3522219]}
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
          <LocateMe />

          {companies &&
            companies.map((item) =>
              item.address.lat && item.address.lng ? (
                <Marker position={[item.address.lat, item.address.lng]}>
                  <Popup>
                    {item.businessname}
                    {item.category}
                    <Nav.Link href={`/business/${item._id}`}>
                      Visit store
                    </Nav.Link>
                  </Popup>
                </Marker>
              ) : null
            )}

          <SearchLocation provider={new OpenStreetMapProvider()} />
        </MapContainer>
      </Container>
    </>
  );
}

export default GeneralMap;
