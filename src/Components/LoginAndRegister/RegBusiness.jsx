import React from "react";
import { useState } from "react";
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

import ContactDetails from "./RegisterComponents/ContactDetails";
import ConfirmDetails from "./RegisterComponents/ConfirmDetails";
import Success from "./RegisterComponents/Success";
import LocationDetails from "./RegisterComponents/LocationDetails";
import AccDetails from "./RegisterComponents/AccDetails";
import TradingHoursDetails from "./RegisterComponents/TradingHoursDetails";

function getSteps() {
  return [
    "Account Details",
    "Contact Details",
    "Location",
    "Trading Hours",
    "Confirm Details",
  ];
}

const RegBusiness = () => {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.formBusiness);
  const [values, setValues] = useState({
    amount: "",
    password: "111",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [datas, setData] = useState({
    contact: {
      email: "s",
      tel: "",
      cell: "",
      insta: "",
      whatsapp: "",
      twitter: "",
    },
    basic: {
      name: "Fish Palace",
      category: "Fishery",
      email: "test@email.com",
      delivery: true,
      password: "1234",
      username: "",
      amount: "",
      weight: "",
      weightRange: "",
      showPassword: false,
    },
    times: {
      monday: { trading: true, open: "09:15", closed: "16:00" },
      tuesday: { trading: true, open: "", closed: "" },
      wednesday: { trading: true, open: "", closed: "" },
      thursday: { trading: true, open: "", closed: "" },
      friday: { trading: true, open: "09:00", closed: "17:00" },
      saturday: { trading: true, open: "", closed: "" },
      sunday: { trading: true, open: "", closed: "" },
      public: { trading: true, open: "", closed: "" },
    },
    info: {
      services: "",
      bio: "",
      img_log: "",
      img_banner: "",
      img_user: "",
    },
  });

  const handlePasswordChange = ({ target }) => {
    // setData({ ...datas, [target.id]: target.value });
    // setData({
    //   ...datas,
    //   [target.id]: { ...datas[target.id], [target.name]: values.password },
    // });
  };

  const handleClickShowPassword = ({ target }) => {
    setData({
      ...datas,
      [target.id]: { ...datas[target.id], showPassword: !values.showPassword },
    });
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const days = Object.keys(datas.times);
  const handleOnChange = ({ target }) => {
    setData({
      ...datas,
      [target.id]: { ...datas[target.id], [target.name]: target.value },
    });
    dispatch({ type: "REG_BUSINESS_CONTACT", payload: datas });
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

    dispatch({ type: "REG_BUSINESS_CONTACT", payload: datas });
  };

  const [activeStep, setActiveStep] = useState(0);
  const [typeAccReg, setTypeAccReg] = useState("business");
  const steps = getSteps();

  function getStepContent(step) {
    if (typeAccReg === "business") {
      switch (step) {
        case 0:
          return (
            <AccDetails
              handleMouseDownPassword={handleMouseDownPassword}
              handlePasswordChange={handlePasswordChange}
              handleClickShowPassword={handleClickShowPassword}
              v={values}
              f={handleOnChange}
              d={datas.basic}
            />
          );
        case 1:
          return <ContactDetails f={handleOnChange} d={datas.contact} />;
        case 2:
          return <LocationDetails />;
        case 3:
          return (
            <TradingHoursDetails
              f={handleTimeChange}
              d={datas.times}
              days={days}
            />
          );
        case 4:
          return <ConfirmDetails d={datas} />;
        default:
          return "Unknown step";
      }
    }
    return <div></div>;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log(typeAccReg);
  return (
    <Container className="my-5">
      <h1>Regsiter Business Account</h1>
      <Stepper activeStep={activeStep}>
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
        {activeStep === steps.length ? (
          <div>
            <Button onClick={handleReset}>Reset</Button>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button className="mx-auto" variant="primary">
              Go To Login
            </Button>
          </div>
        ) : (
          <div>
            <Container className="float-right my-4">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
              </Button>
              <Typography>{getStepContent(activeStep)}</Typography>
            </Container>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RegBusiness;
