import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Autocomplete,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  Chip,
  Box,
  Checkbox,
} from "@mui/material";
import countrylist from "../../../json/countries.json";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useTheme } from "@mui/material/styles";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cities = [
  "Rome",
  "Milan",
  "Messina",
  "Palermo",
  "Catania",
  "Veneto",
  "Venezia",
  "Firenze",
  "Pisa",
  "Constania",
];

const LocationDetails = () => {
  const countries = countrylist;
  const [location, setLocation] = useState({
    country: "",
    city: "",
    region: "",
    address: "",
    serviceArea: "",
  });

  const handleLocationChange = (input) => (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const inputLocationChange = (e, newInputValue) => {
    setLocation({ ...location, [e.target.name]: newInputValue });
  };
  return (
    <Container>
      <p className="m-3">Bussiness Location</p>
      {/* <Container>
        <Row className="gx-2">
          <Col md={7}>
            <Autocomplete
              name="country"
              value={location.country}
              onInputChange={inputChange}
              id="combo-box-demo"
              options={countries}
              renderInput={(params) => (
                <TextField
                  name="country"
                  {...params}
                  label="Country"
                  variant="standard"
                  onChange={handleChange}
                />
              )}
            />
          </Col>

          <Col xs={5}>
            <Autocomplete
              name="region"
              value={location.region}
              onInputChange={inputChange}
              id="combo-box-demo"
              options={countries}
              renderInput={(params) => (
                <TextField
                  name="region"
                  {...params}
                  label="Region"
                  variant="standard"
                  onChange={handleChange}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Autocomplete
              name="city"
              value={location.city}
              onInputChange={inputChange}
              id="combo-box-demo"
              options={countries}
              renderInput={(params) => (
                <TextField
                  name="city"
                  {...params}
                  label="City"
                  variant="standard"
                  onChange={handleChange}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Autocomplete
              name="address"
              value={location.address}
              onInputChange={inputChange}
              id="combo-box-demo"
              options={countries}
              renderInput={(params) => (
                <TextField
                  name="address"
                  {...params}
                  label="Address"
                  variant="standard"
                  onChange={handleChange}
                />
              )}
            />
          </Col>
        </Row>
      </Container>
      <hr className="my-5" />
      <p className="m-3">Service Areas</p>
      <Container>
        <Autocomplete
          name="serviceArea"
          multiple
          value={location.serviceArea}
          id="size-small-standard-multi"
          options={cities}
          onInputChange={inputChange}
          disableCloseOnSelect
          getOptionLabel={(city) => city}
          renderOption={(props, city, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {city}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              name="serviceArea"
              {...params}
              label="City"
              variant="standard"
            />
          )}
        />
      </Container> */}
    </Container>
  );
};

export default LocationDetails;
