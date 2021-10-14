import React from "react";
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
import "./RegisterComponents/businessRegister.css";

import ContactDetails from "./RegisterComponents/ContactDetails";
import ConfirmDetails from "./RegisterComponents/ConfirmDetails";
import LocationDetails from "./RegisterComponents/LocationDetails";
import AccDetails from "./RegisterComponents/AccDetails";
import TradingHoursDetails from "./RegisterComponents/TradingHoursDetails";

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
  const URL = process.env.REACT_APP_API_URL;
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState({});
  const steps = getSteps();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [datas, setData] = useState({
    basic: {
      name: "",
      category: "",
      email: "",
      delivery: true,
      password: "",
      username: "",
      url: "",
    },
    contact: {
      email: "s",
      tel: "",
      cell: "",
      insta: "",
      whatsapp: "",
      twitter: "",
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
    info: {
      services: "",
      bio: "",
      img_log: "",
      img_banner: "",
      img_user: "",
    },
  });

  const sendReg = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      if (response.ok) {
        setLoading(false);
        console.log(datas);
      } else {
        throw new Error("Could send data, but something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
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
      [target.name]: { ...datas[target.name], [target.id]: target.value },
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
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AccDetails
            handleMouseDownPassword={handleMouseDownPassword}
            handlePasswordChange={handleOnChange}
            handleClickShowPassword={handleClickShowPassword}
            v={values}
            f={handleOnChange}
            d={datas.basic}
            i={datas.info}
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              className="mx-auto"
              variant="primary"
              href="/business/login"
            >
              Go To Login
            </Button>
          </div>
        ) : (
          <div>
            <Container className="float-right my-4">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {completedSteps() === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={sendReg}>
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
              <Typography>{getStepContent(activeStep)}</Typography>
            </Container>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RegBusiness;
