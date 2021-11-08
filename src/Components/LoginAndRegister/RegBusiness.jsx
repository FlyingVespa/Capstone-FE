import React from "react";
import { useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StepLabel,
  Step,
  Typography,
  Stepper,
  Container,
  Button,
} from "@mui/material";
import "./RegisterComponents/businessRegister.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import ContactDetails from "./RegisterComponents/ContactDetails";
import ConfirmDetails from "./RegisterComponents/ConfirmDetails";
import LocationDetails from "./RegisterComponents/LocationDetails";
import AccDetails from "./RegisterComponents/AccDetails";
import TradingHoursDetails from "./RegisterComponents/TradingHoursDetails";

import axios from "axios";

const getSteps = () => {
  return [
    "Account Details",
    "Contact Details",
    "Business Location",
    "Trading Hours",
    "Confirm Details",
  ];
};

const RegBusiness = (routerProps) => {
  const dispatch = useDispatch();
  const dispatchData = () =>
    dispatch({
      type: "REGISTER_BUSINESS_USER",
      payload: datas,
    });
  const URL = process.env.REACT_APP_API_URL;
  const helper = useSelector((s) => s.helper.activeStep);
  const [loading, setLoading] = useState({});
  const steps = getSteps();
  const [datas, setData] = useState({
    password: "1234",
    email: "default@test.com",
    businessname: "Default",
    category: "Default",
    shipping: false,
    username: "Default",
    url: "Default",
    services: "Default",
    bio: "Default Default Default Default",
    img_log: "",
    img_banner: "",
    img_user: "",
    address: {
      street_number:"",
      street_name:"",
      city:"",
      state:"",
      country:"",
      lat: "",
      lng:"",
      },
    location: {
      lat: null,
      lng: null,
    },
    contact: {
      pub_email: "Default@test.com",
      tel: "12325435",
      cell: "154351343",
      insta: "125334252",
      whatsapp: "1534543",
      twitter: "12543@gs",
    },
    times: {
      monday: { trading: true, open: "09:15", closed: "16:00" },
      tuesday: { trading: true, open: "09:15", closed: "16:00" },
      wednesday: { trading: true, open: "09:15", closed: "16:00" },
      thursday: { trading: true, open: "09:15", closed: "16:00" },
      friday: { trading: true, open: "09:00", closed: "17:00" },
      saturday: { trading: true, open: "09:15", closed: "16:00" },
      sunday: { trading: true, open: "09:15", closed: "16:00" },
      public: { trading: true, open: "09:15", closed: "16:00" },
    },
  });

  const handleContactChange = ({ target }) => {
    setData({
      ...datas,
      [target.name]: { ...datas[target.name], [target.id]: target.value },
    });
    dispatchData();
  };
  
  const handleChange = ({ target }) => {
    setData({
      ...datas,
      [target.id]: target.value,
    });
    dispatchData();
  };
  const handleTimeChange = ({ target }) => {
    setData({
      ...datas,
      times: {
        ...datas.times,
        [target.name]: {
          ...datas.times[target.name],
          [target.id]: target.value || target.checked,
        },
      },
    });
    dispatchData();
  };
// a new function that i have created since we already did the api call in LocationDetails
  const handleAddressSelect = (addressData) => {
      setData({
        ...datas,
        address: addressData,
      });
  };
  // effect function to avoid the state delay because useState is asynchronous so it could 
  // send the data with dispatchData before the state finishes updating , so i used this with 
  // the dependency of the address
  useEffect(()=>{    
    dispatchData();
    console.log(datas)
  },[datas.address])
// so this one is no more used u can delete it

  const handleNext = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
  };
  const handlePrev = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });
  };

  const config = {
    method: "post",
    url: `${URL}/business`,
    headers: {
      "Content-Type": "application/json",
    },
    data: datas,
  };

  const regsiterBusiness = () => {
    axios(config)
      .then((res) => {
        JSON.stringify(res.data);
        console.log("Success, Regsitered", res);
      })
      .catch((err) => console.log(err));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AccDetails datas={datas} handleChange={handleChange} />;
      case 1:
        return <ContactDetails f={handleContactChange} d={datas.contact} />;
      case 2:
        return (
          <LocationDetails
           f={handleAddressSelect}

           />
          
          
        );

      case 3:
        return (
          <TradingHoursDetails
            f={handleTimeChange}
            d={datas.times}
            days={Object.keys(datas.times)}
          />
        );
      case 4:
        return <ConfirmDetails details={datas} />;

      default:
        return "Unknown step";
    }
  };

  return (
    <Container className="my-5">
      <h1>Regsiter Business Account</h1>
      <Stepper activeStep={helper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {helper === steps.length ? (
          <div>
            <Typography>
              All steps completed - ready to finalize registration
            </Typography>
            <Button
              className="mx-auto"
              variant="primary"
              onClick={regsiterBusiness}
            >
              REGISTER
            </Button>
            <Button className="mx-auto" variant="danger">
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Container className="float-right my-4">
              <Button disabled={helper === 0} onClick={handlePrev}>
                Back
              </Button>
              {helper === 4 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Sure everything is correct?, Operation hours, location can be changed later details can be changed later."
                      )
                    ) {
                      handleNext();
                    }
                  }}
                >
                  Confirm
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
              <Typography>{getStepContent(helper)}</Typography>
            </Container>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RegBusiness;
