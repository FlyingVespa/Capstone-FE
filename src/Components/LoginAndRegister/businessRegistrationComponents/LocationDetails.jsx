import { useState , useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import countrylist from "../../../json/countries.json";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useTheme } from "@mui/material/styles";
import axios from 'axios'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationDetails = ({f}) => {
  const [input, setInput] = useState("");
  const [selected,setSelected] = useState(false) 
  const [addresss, setAddresss] = useState(null);
  const [addressData,setAddressData] = useState(null)
  
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const getAddress = async ( lat,lng ) =>{
      try{
        // add your api key here and in the html script tag in /public/index.html
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
          const Data = res.data
                 return setAddresss(Data.results[0].address_components)
      }catch(error){
        console.log(error)
      }
      
  }

  const putAddressData = async (addresss , coordinates) =>{
    
    try{
       setAddressData({
        street_number:`${addresss.filter(e => e.types[0]==='street_number').map(e => e.long_name)}`,
        street_name:`${addresss.filter(e => e.types[0]==='route'||e.types[0]==='neighborhood').map(e =>  e.long_name)}`,
        city: `${addresss.filter(e => e.types[0]==='locality').map(e =>  e.long_name)}`,
        state: `${addresss.filter(e => e.types[0]==='administrative_area_level_1').map(e =>  e.long_name)}`,
        country: `${addresss.filter(e => e.types[0]==='country').map(e =>  e.long_name)}`,
        lat: coordinates.lat,
        lng:coordinates.lng,
      },)
    }catch(err){} 
  }


  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setSelected(true);
    setCoordinates(latLng);
     getAddress(latLng.lat , latLng.lng)
     
  };

useEffect(()=>{
   if (addresss){
     putAddressData(addresss , coordinates)
   }
   console.log(addresss)
},[addresss])

useEffect(()=>{
  console.log(addressData)  
    f(addressData)  
},[addressData])
 
return (
    <div>
      <PlacesAutocomplete
        value={input}
        onChange={(value)=>{
          setInput(value)
          setSelected(false)
        } }
        onSelect={ (value) => {
          setInput(value)
          handleSelect(value)
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Row className="mt-3">
              <Col>
                <input {...getInputProps({ placeholder: "Type address" })} />
                <div>
                  {loading ? <div>...loading</div> : null}
                          
                  {suggestions.map((suggestion , sugIndex) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div key = {sugIndex} {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col>
              {
                addresss && <>
                <p name>Latitude: { selected && coordinates.lat}</p>
                <p>Longitude: {selected && coordinates.lng}</p>
                <p>Street: {selected && addresss.filter(e => e.types[0]==='route'||e.types[0]==='neighborhood').map(e => {return e.long_name})}</p>
                <p>City: {selected && addresss.filter(e => e.types[0]==='locality').map(e => {return e.long_name})}</p>
                <p>State: {selected && addresss.filter(e => e.types[0]==='administrative_area_level_1').map(e => {return e.long_name})}</p>
                <p>Country: {selected && addresss.filter(e => e.types[0]==='country').map(e => {return e.long_name})}</p>
                 
                </>
              }
              </Col>
            </Row>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationDetails;
