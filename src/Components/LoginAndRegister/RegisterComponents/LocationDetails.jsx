import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import countrylist from "../../../json/countries.json";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MapTest from "../../MapTest";
import { useTheme } from "@mui/material/styles";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationDetails = () => {
  const [address, setAddress] = useState("");
  const [addresss, setAddresss] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    const nameList = value.split(",");

    setAddresss(nameList);
  };
  const handlechange = () => {};
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Row className="mt-3">
              <Col>
                <input {...getInputProps({ placeholder: "Type address" })} />
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col>
                <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p>
                <p>Street: {addresss[0]}</p>
                <p>City: {addresss[1]}</p>
                <p>State: {addresss[2]}</p>
                <p>Country: {addresss[3]}</p>
              </Col>
            </Row>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationDetails;
