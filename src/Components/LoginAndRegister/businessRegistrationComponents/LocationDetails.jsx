import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationDetails = ({ f }) => {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressData, setAddressData] = useState(null);

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const getAddress = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const Data = res.data;
      console.log(Data);
      return setAddress(Data.results[0].address_components);
    } catch (error) {
      console.log(error);
    }
  };

  const putAddressData = async (addresss, coordinates) => {
    try {
      setAddressData({
        street_number: `${addresss
          .filter((e) => e.types[0] === "street_number")
          .map((e) => e.long_name)}`,
        street_name: `${addresss
          .filter(
            (e) => e.types[0] === "route" || e.types[0] === "neighborhood"
          )
          .map((e) => e.long_name)}`,
        city: `${addresss
          .filter((e) => e.types[0] === "locality")
          .map((e) => e.long_name)}`,
        state: `${addresss
          .filter((e) => e.types[0] === "administrative_area_level_1")
          .map((e) => e.long_name)}`,
        country: `${addresss
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
    <div>
      <PlacesAutocomplete
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
              <Row>
                <input {...getInputProps({ placeholder: "Type address" })} />
                <div>
                  {loading ? <div>...loading</div> : null}

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
              </Row>
              {address && address.length > 0 && (
                <Card>
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
            </Row>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationDetails;
