import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, List, ListItemText, Skeleton } from "@mui/material";

import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationDetails = (handleAddressChange) => {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(false);
  // const [addresss, setAddresss] = useState(null);
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const getAddress = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCDOhn5o12S698dbZ8eQkI7X9nj6XQQUjk`
      );
      const Data = res.data;
      console.log(Data.results[0]);
      
      await setAddress({
        street_number: Data.results[0].address_components[0].long_name,
        street_name: Data.results[0].address_components[1].long_name,
        city: Data.results[0].address_components[3].long_name,
        state: Data.results[0].address_components[4].long_name,
        country: Data.results[0].address_components[5].long_name,
        zip: Data.results[0].address_components[7].long_name
         
      });
     
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setSelected(true);
    setCoordinates(latLng);
    await getAddress(latLng.lat, latLng.lng);
  };

  //  const handleAddressValue = (value) => {
  //    addresss.filter(e => e.types[0]=== value).map(e => {return e.long_name})}


  return (
    <>
      <PlacesAutocomplete
        value={input}
        onChange={(value) => {
          setInput(value);
          setSelected(false);
          setAddress(null);
        }}
        onSelect={(value) => {
          setInput(value);
          handleSelect(value);
          console.log(address);
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <Row className="mt-3">
              <Col>
                <TextField
                  variant="standard"
                  {...getInputProps({ placeholder: "Type Address" })}
                />
                <>
                  {loading ? (
                    <div>
                      {" "}
                      <Skeleton sx={{ width: 200 }} />
                      <Skeleton animation="wave" sx={{ width: 200 }} />
                    </div>
                  ) : null}
                  {suggestions.map((suggestion, sugIndex) => {
                    return (
                      <>
                        <List
                          component="nav"
                          aria-label="secondary mailbox folder"
                        >
                          <ListItemText
                            key={sugIndex}
                            {...getSuggestionItemProps(suggestion)}
                            primary={suggestion.description}
                          />
                        </List>
                        {/* <div key = {sugIndex} {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}

                      </div> */}
                      </>
                    );
                  })}
                </>
              </Col>
              <Col>
               
                <TextField
                  name="street_number"
                  variant="standard"
                  placeholder="street number"
                  value={address?.street_number}
                  onChange={handleAddressChange}
                />
                {/* <TextField name="lat" variant="standard"placeholder="Lat" value={address?.geometry.location.lat}/>
                  <TextField name="lon" variant="standard"placeholder="Lon" value={address?.geometry.location.lng}/>
                  <TextField name="street_number" variant="standard"placeholder="street number" value={address?.address_components.filter(e => e.types[0]==='street_number').map(e => {return e.long_name})} />       
                  <TextField name="street_name" variant="standard"placeholder="street" value={address?.address_components.filter(e => e.types[0]==='route'||e.types[0]==='neighborhood').map(e => {return e.long_name})}  />       
                  <TextField name="city" variant="standard"placeholder="city" value={address?.address_components.filter(e => e.types[0]==='locality').map(e => {return e.long_name})} />       
                  <TextField name="state" variant="standard"placeholder="state" value={address?.address_components.filter(e => e.types[0]==='administrative_area_level_1').map(e => {return e.short_name})} />       
                  <TextField name="country" variant="standard"placeholder="country" value={address?.address_components.filter(e => e.types[0]==='country').map(e => {return e.long_name})} /> */}
                {/* {
                addresss && <>
                <p id="lat">Latitude: { selected && coordinates.lat}</p>
                <p id="lon">Longitude: {selected && coordinates.lng}</p>
                <p id="street_name">Street: {selected && addresss.filter(e => e.types[0]==='route'||e.types[0]==='neighborhood').map(e => {return e.long_name})}</p>
                <p id="city">City: {selected && addresss.filter(e => e.types[0]==='locality').map(e => {return e.long_name})}</p>
                <p id="state">State: {selected && addresss.filter(e => e.types[0]==='administrative_area_level_1').map(e => {return e.long_name})}</p>
                <p id="country"> Country: {selected && addresss.filter(e => e.types[0]==='country').map(e => {return e.long_name})}</p>
                </>
              } */}
              </Col>
            </Row>
          </>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default LocationDetails;
