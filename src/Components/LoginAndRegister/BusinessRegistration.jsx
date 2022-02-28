import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StepLabel, Step, Typography, Stepper, Container } from "@mui/material";

import { Button } from "react-bootstrap";
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
  const navigate = useNavigate();

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
    email: "default@business.com",
    businessname: "Default",
    category: "Default",
    shipping: false,
    username: "Default",
    url: "Default",
    services: "Default",
    bio: "Default Default Default Default",
    img_logo: "",
    img_banner: "",
    img_user: "",
    address: "",
    location: {
      lat: null,
      lng: null,
      street_number: null,
      street: null,
      city: null,
      state: null,
      country: null,
    },
    contact: {
      pub_email: "",
      tel: "",
      cell: "",
      insta: "",
      whatsapp: "",
      twitter: "",
    },
    times: [
      { day: 0, trading: true, open: "09:15", closed: "16:00" },
      { day: 1, trading: true, open: "09:15", closed: "16:00" },
      { day: 2, trading: true, open: "09:15", closed: "16:00" },
      { day: 3, trading: true, open: "09:15", closed: "16:00" },
      { day: 4, trading: true, open: "09:00", closed: "17:00" },
      { day: 5, trading: true, open: "09:15", closed: "16:00" },
      { day: 6, trading: true, open: "09:15", closed: "16:00" },
      { day: 7, trading: true, open: "09:15", closed: "16:00" },
    ],
  });

  const handleClearFromData = async () => {
    await setData({});
    await dispatchData();
    navigate("/");
  };
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
      [target.name]: target.value,
    });
    dispatchData();
  };
  const handleChecked = ({ target }) => {
    setData({
      ...datas,
      times: {
        ...datas.times,
        [target.id]: false,
      },
    });
    dispatchData();
  };

  const handleTimeChange = ({ target }) => {
    setData({
      ...datas,
      [target.name]: {
        ...datas[target.name],
        [target.id]: target.value,
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

  const handleNext = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
  };
  const handlePrev = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });
  };
  const handleStep = (step) => () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: step });
  };

  const registerBusiness = async () => {
    console.log("Click");
    try {
      const res = await axios.post(`${URL}/register`, datas);
      console.log("Success, Regsitered Business Account", res.data);
      console.log("click");
    } catch (error) {
      console.error(error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AccDetails d={datas} f={handleChange} />;
      case 1:
        return (
          <ContactDetails
            f={handleContactChange}
            d={datas.contact}
            t={handleChecked}
          />
        );
      case 2:
        return <LocationDetails f={handleAddressSelect} />;
      case 3:
        return (
          <TradingHoursDetails
            f={handleTimeChange}
            d={datas.times}
            c={handleChecked}
          />
        );

      default:
        return <ConfirmDetails details={datas} />;
    }
  };

  return (
    <Container className="my-2 p-0" id="stepper-business">
      <h2>Regsiter Business Account</h2>
      <div>
        <Stepper activeStep={helper} className="my-3">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step
                id="sss"
                key={label}
                {...stepProps}
                onClick={handleStep(index)}
              >
                {window.innerWidth > 990 ? (
                  <StepLabel {...labelProps}>{label}</StepLabel>
                ) : (
                  <StepLabel {...labelProps}></StepLabel>
                )}
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div>
        {helper === steps.length ? (
          <>
            <Typography>
              All steps completed - ready to finalize registration
            </Typography>
            <Button
              className="mx-auto"
              variant="primary"
              onClick={registerBusiness}
            >
              REGISTER
            </Button>
            <Button
              className="mx-auto"
              variant="danger"
              onClick={handleClearFromData}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography>{getStepContent(helper)}</Typography>
            <div className="my-3" id="stepper-btn">
              <Button disabled={helper === 0} onClick={handlePrev}>
                Back
              </Button>
              {helper === 4 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
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
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default BusinessRegistration;
