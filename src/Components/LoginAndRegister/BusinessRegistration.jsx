import { useState, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StepLabel, Step, Typography, Stepper, Container } from "@mui/material";

import { Button, Form, Alert } from "react-bootstrap";
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
  const myForm = useRef(null);
  const URL = process.env.REACT_APP_API_URL;
  const helper = useSelector((s) => s.helper.activeStep);
  const steps = getSteps();
  const [datas, setData] = useState([]);
  const [skipped, setSkipped] = useState(new Set());
  const [show, setShow] = useState(false);

  const handleClearFromData = async () => {
    await setData({});
    await dispatch({ type: "SET_ACTIVE_STEP", payload: 0 });
  };
  const handleContactChange = ({ target }) => {
    setData({
      ...datas,
      [target.name]: { ...datas[target.name], [target.id]: target.value },
    });
  };
  const handleAccDetailsChange = (payload) => {
    setData({
      ...datas,
      accdetails: payload,
    });
  };
  const handleChange = (payload) => {
    setData({
      ...datas,
      contact: payload,
    });
  };

  const handleAddress = (addressData) => {
    setData({
      ...datas,
      address: addressData,
    });
  };

  const handleTime = (times) => {
    setData({
      ...datas,
      times: times,
    });
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
  };

  const registerBusiness = async () => {
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
        return <ContactDetails f={handleChange} />;
      case 2:
        return <LocationDetails f={handleAddress} />;
      case 3:
        return (
          <TradingHoursDetails f={handleTime} d={datas.times} datas={datas} />
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
      <Form action="/" method="POST" ref={myForm}>
        {helper === steps.length ? (
          <>
            <Typography>
              All steps completed - ready to finalize registration
            </Typography>
            <Button
              className="mx-auto"
              variant="primary"
              onClick={() => registerBusiness}
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
                  one. Once all are filled, then only you can continue
                </p>
              </Alert>
            ) : (
              ""
            )}
            ;
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
    </Container>
  );
};

export default BusinessRegistration;
