import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StepLabel,
  Step,
  Typography,
  Stepper,
  Container,
  Button,
} from "@mui/material";
import "./LoginRegistration.css";
import ContactDetails from "./businessRegistrationComponents/ContactDetails";
import ConfirmDetails from "./businessRegistrationComponents/ConfirmDetails";
import LocationDetails from "./businessRegistrationComponents/LocationDetails";
import AccDetails from "./businessRegistrationComponents/AccDetails";
import TradingHoursDetails from "./businessRegistrationComponents/TradingHoursDetails";

const getSteps = () => {
  return [
    "Account Details",
    "Contact Details",
    "Business Location",
    "Trading Hours",
    "Confirm Details",
  ];
};

const BusinessRegistration = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const dispatchData = () =>
    dispatch({
      type: "REGISTER_BUSINESS_USER",
      payload: datas,
    });
  const URL = process.env.REACT_APP_API_URL;
  const helper = useSelector((s) => s.helper.activeStep);
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
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      country: "",
      lat: "",
      lng: "",
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
  // To change target.id to target.name
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
  const handleAddressSelect = (addressData) => {
    setData({
      ...datas,
      address: addressData,
    });
  };

  useEffect(() => {
    dispatchData();
    console.log(datas);
  }, []);
  // datas.address in []
  const handleNext = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
  };
  const handlePrev = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });
  };

  const regsiterBusiness = () => {
    axios
      .post(`${URL}/register/business`, datas)
      .then((res) => {
        JSON.stringify(res.data);
        console.log("Success, Regsitered Business Account", res);
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
        return <LocationDetails f={handleAddressSelect} />;

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
          // add validity check if form is missing something to indicate where
          // if (isStepFailed(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption" color="error">
          //       Alert message
          //     </Typography>
          //   );
          //   labelProps.error = true;
          // }

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
            <Button
              className="mx-auto"
              variant="danger"
              onClick={() => {
                history.push("/");
              }}
            >
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

export default BusinessRegistration;
