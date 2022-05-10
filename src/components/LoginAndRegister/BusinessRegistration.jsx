import { useState, useRef } from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { StepLabel, Step, Typography, Stepper, Container } from "@mui/material";
import { Button, Form, Alert, Col } from "react-bootstrap";
import "./LoginRegistration.css";
import CompanyDetails from "./businessRegistrationComponents/CompanytDetails";
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
  const myForm = useRef(null);
  const URL = process.env.REACT_APP_API_URL;
  const helper = useSelector((s) => s.helper.activeStep);
  const steps = getSteps();
  const [datas, setData] = useState({
    accdetails: {
      email: "defaul@business.com",
      password: "1234",
      url: "default",
      businessname: "",
      category: "",
      username: "",
    },
    address: {
      lat: "",
      lng: "",
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      country: "",
    },
    companydetails: {
      bio: "",
      cell: "",
      public_email: "",
      services: "",
      shipping: false,
    },
    tradingtimes: [
      { day: 0, trading: false, open: "08:20", closed: "17:00" },
      { day: 1, trading: true, open: "08:20", closed: "17:00" },
      { day: 2, trading: true, open: "08:20", closed: "17:00" },
      { day: 3, trading: true, open: "08:20", closed: "17:00" },
      { day: 4, trading: true, open: "08:20", closed: "17:00" },
      { day: 5, trading: true, open: "08:20", closed: "17:00" },
      { day: 6, trading: false, open: "08:20", closed: "17:00" },
    ],
  });
  const [show, setShow] = useState(false);

  const handleClearFromData = async () => {
    await setData({});
    await dispatch({ type: "SET_ACTIVE_STEP", payload: 0 });
  };

  const handleAccDetailsChange = (payload) => {
    setData({
      ...datas,
      accdetails: payload,
    });
  };
  const handleCompanyDetailsChange = (payload) => {
    setData({
      ...datas,
      companydetails: payload,
    });
  };

  const handleAddressChange = (payload) => {
    setData({
      ...datas,
      address: payload,
    });
  };

  const handleTimeChange = (times) => {
    setData({
      ...datas,
      tradingtimes: times,
    });
    console.log(datas);
  };

  const handleNext = () => {
    if (!myForm.current.checkValidity()) {
      setShow(true);
      return;
    }
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
    dispatch({ type: "REGISTER_BUSINESS_USER", payload: datas });
    console.log("DDD", datas);
  };
  const handlePrev = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });
  };
  const handleStep = (step) => () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: step });
    dispatch({ type: "REGISTER_BUSINESS_USER", payload: datas });
  };
  const ss = useSelector((s) => s.users.registerBusiness);

  const registerBusiness = async () => {
    console.log(ss);
    try {
      const res = await axios.post(`${URL}/register`, datas);
      let registration = await res.data;
      console.log("Success, Regsitered Business Account", registration);
      console.log("click");
    } catch (error) {
      console.error(error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AccDetails f={handleAccDetailsChange} />;
      case 1:
        return <CompanyDetails f={handleCompanyDetailsChange} />;
      case 2:
        return <LocationDetails f={handleAddressChange} d={datas} />;
      case 3:
        return <TradingHoursDetails f={handleTimeChange} />;
      default:
        return <ConfirmDetails details={datas} />;
    }
  };

  return (
    <>
      <Container id="stepper-business">
        <h2>Regsiter Business Account</h2>
        <div>
          <Stepper activeStep={helper} className="my-3">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps} onClick={handleStep(index)}>
                  {window.innerWidth > 990 ? (
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  ) : (
                    <StepLabel {...labelProps}></StepLabel>
                  )}
                </Step>
              );
            })}
          </Stepper>

          <Form ref={myForm}>
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
                {show ? (
                  <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    <Alert.Heading>Missing Field(s)</Alert.Heading>
                    <p>
                      Please review all fields carefully, you might have skipped
                      one. Once all are filled, then only you can continue8
                    </p>
                  </Alert>
                ) : (
                  ""
                )}
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
          </Form>
        </div>
      </Container>
    </>
  );
};

export default BusinessRegistration;
