import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Spinner,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FormLabel } from "@mui/material";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { useDispatch, useSelector } from "react-redux";

const LocationDetails = ({ f, d, s }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(d ? d.address : {});
  const [address, setAddress] = useState(d ? d.address : {});
  const [addressData, setAddressData] = useState(d ? d.address : {});

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const handleLoading = (payload) => {
    dispatch({ type: "SET_LOADING", payload: payload });
  };
  useEffect(() => {
    setAddress(d.address);
  }, []);

  const loadingRedux = useSelector((s) => s.helper.loading);
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const getAddress = async (lat, lng) => {
    handleLoading(true);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const Data = await res.data;
      console.log(Data);
      await setAddress(Data.results[0].address_components);
      handleLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const putAddressData = async (address, coordinates) => {
    try {
      setAddressData({
        street_number: `${address
          .filter((e) => e.types[0] === "street_number")
          .map((e) => e.long_name)}`,
        street_name: `${address
          .filter(
            (e) => e.types[0] === "route" || e.types[0] === "neighborhood"
          )
          .map((e) => e.long_name)}`,
        city: `${address
          .filter((e) => e.types[0] === "locality")
          .map((e) => e.long_name)}`,
        state: `${address
          .filter((e) => e.types[0] === "administrative_area_level_1")
          .map((e) => e.long_name)}`,
        country: `${address
          .filter((e) => e.types[0] === "country")
          .map((e) => e.long_name)}`,
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    } catch (err) {}
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setSelected(true);
    setCoordinates(latLng);
    getAddress(latLng.lat, latLng.lng);
  };
  useEffect(() => {
    setAddress(d.address);
    console.log("address", address);
  }, []);

  useEffect(() => {
    if (address) {
      putAddressData(address, coordinates);
    }
    console.log(address);
  }, [address]);

  useEffect(() => {
    console.log(addressData);
    f(addressData);
  }, [addressData]);

  return (
    <div className="address-details my-1">
      {d.address ? (
        <></>
      ) : (
        <FormLabel component="legend">Address Details</FormLabel>
      )}
      <PlacesAutocomplete
        fullWidth
        value={input}
        onChange={(value) => {
          setInput(value);
          setSelected(false);
        }}
        onSelect={(value) => {
          setInput(value);
          handleSelect(value);
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Row className="mt-3">
              <InputGroup>
                <InputGroup.Text>Address</InputGroup.Text>
                <Form.Control
                  // disabled={s}
                  {...getInputProps({
                    placeholder: "Type address",
                    disabled: s,
                  })}
                />
              </InputGroup>
              <div>
                {loading ? (
                  <Row>
                    <span>
                      <Spinner animation="grow" /> Searching address...
                    </span>
                  </Row>
                ) : null}

                {suggestions.map((suggestion, sugIndex) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };

                  return (
                    <div
                      key={sugIndex}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>

              {input.length > 3 && loadingRedux ? (
                <span>
                  <Spinner animation="grow" /> Plotting location, wait before
                  next step..
                </span>
              ) : d.address ? (
                <Container>
                  <Card className="mt-2 p-1">
                    <span>
                      {d.address?.street_number} {d.address?.street_name},{" "}
                      {d.address?.city}, {d.address?.state},{" "}
                      {d.address?.country}
                    </span>
                  </Card>
                </Container>
              ) : (
                <>
                  {address && address.length > 2 && selected && (
                    <Card className="my-5">
                      <Col className="p-3">
                        <div>
                          <span className="p-2 location">Street Number:</span>
                          <span>
                            {selected &&
                              address
                                .filter((e) => e.types[0] === "street_number")
                                .map((e) => e.short_name)}
                          </span>
                        </div>
                        <div>
                          <span className="p-2 location">Street:</span>
                          <span>
                            {selected &&
                              address
                                .filter(
                                  (e) =>
                                    e.types[0] === "route" ||
                                    e.types[0] === "neighborhood"
                                )
                                .map((e) => e.long_name)}
                          </span>
                        </div>
                        <div>
                          <span className="p-2 location">City:</span>
                          <span>
                            {selected &&
                              address
                                .filter((e) => e.types[0] === "locality")
                                .map((e) => e.long_name)}
                          </span>
                        </div>
                        <div>
                          <span className="p-2 location">State:</span>
                          <span>
                            {selected &&
                              address
                                .filter(
                                  (e) =>
                                    e.types[0] === "administrative_area_level_1"
                                )
                                .map((e) => e.long_name)}
                          </span>
                        </div>
                        <div>
                          <span className="p-2 location">Country:</span>
                          <span>
                            {selected &&
                              address
                                .filter((e) => e.types[0] === "country")
                                .map((e) => e.long_name)}
                          </span>
                        </div>
                        <Row>
                          <Col>
                            <span className="p-2 location">Latitude:</span>
                            <span>{selected && coordinates.lat}</span>
                          </Col>
                          <Col>
                            <span className="p-2 location">Longitude:</span>
                            <span>{selected && coordinates.lng}</span>
                          </Col>
                        </Row>
                      </Col>
                    </Card>
                  )}
                </>
              )}
            </Row>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationDetails;
