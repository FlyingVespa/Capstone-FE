import { useState, useEffect, Fragment } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { Link, withRouter } from "react-router-dom";
import SearchOutput from "./SearchOutput";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

function SearchBar({ usersData, routerProps }) {
  const [query, setQuery] = useState({});
  const [criteria, setCriteria] = useState("");
  const [openCity, setOpenCity] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const loadingCity = openCity && options.length === 0;
  const loadingSearch = openSearch && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  const URL = process.env.REACT_APP_API_URL;
  const filteredCity = [
    { city: "Messina", country: "italy" },
    { city: "Parlemo", country: "italy" },
    { city: "Catania", country: "italy" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Bellville", country: "South Africa" },
    { city: "Brackenfell", country: "South Africa" },
  ];

  useEffect(() => {
    let active = true;
    if (!loadingCity) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.
      if (active) {
        setOptions([...filteredCity]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loadingCity]);
  useEffect(() => {
    if (!openSearch) {
      setOptions([]);
    }
    if (!openCity) {
      setOptions([]);
    }
  }, [openCity, openSearch]);
  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  return (
    <>
      <Container className="searchBar">
        <Row>
          <Col>
            <Autocomplete
              id="City-select"
              open={openCity}
              onOpen={() => {
                setOpenCity(true);
              }}
              onClose={() => {
                setOpenCity(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.city === value.city
              }
              getOptionLabel={(option) => option.city}
              options={options}
              loading={loadingCity}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loadingCity ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
            />
          </Col>
          <Col>
            <Select
              displayEmpty
              variant="filled"
              labelId="select-criteria"
              id="select-criteria"
              value={criteria}
              label="Age"
              defaultValue="name"
              onChange={handleCriteriaChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select Criteria
              </MenuItem>
              <MenuItem value="name">Store Name</MenuItem>
              <MenuItem value="category">Product</MenuItem>
              <MenuItem value="product">Store Type</MenuItem>
              <MenuItem value="service">Service</MenuItem>
            </Select>
          </Col>
          {criteria === "category" ? (
            <Col>
              <Autocomplete
                id="Search Store by Name"
                open={openSearch}
                onOpen={() => {
                  setOpenSearch(true);
                }}
                onClose={() => {
                  setOpenSearch(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.basic.category === value.basic.category
                }
                getOptionLabel={(option) => option.basic.category}
                options={usersData}
                loading={loadingSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Store by Category"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loadingSearch ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Col>
          ) : (
            <Col>
              <Autocomplete
                id="Search Store by Name"
                open={openSearch}
                onOpen={() => {
                  setOpenSearch(true);
                }}
                onClose={() => {
                  setOpenSearch(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.basic.name === value.basic.name
                }
                getOptionLabel={(option) => option.basic.name}
                options={usersData}
                loading={loadingSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Store by Name"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loadingSearch ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default withRouter(SearchBar);
