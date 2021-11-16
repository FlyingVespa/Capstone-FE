// Libraries
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// Styling
import {
  Button,
  StepLabel,
  Step,
  Typography,
  Stepper,
  Container,
} from "@mui/material";

// Componets
import LocationDetails from "./clientRegistrationComponents/LocationDetails.jsx";
import AccDetails from "./clientRegistrationComponents/AccDetails.jsx";
import ConfirmDetails from "./clientRegistrationComponents/ConfirmDetails.jsx";

const getSteps = () => {
  return ["Account Details", "Location Details", "Confirm Details"];
};

const ClientRegistration = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;

  const helper = useSelector((s) => s.helper.activeStep);
  const steps = getSteps();

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
    dispatchData();
  };
  const [data, setData] = useState({
    email: "client@test.com",
    lastname: "Smith",
    firstname: "John",
    password: "1234",
    username: "jonnyboy",
    service_area: "Messina",
  });
  const dispatchData = () =>
    dispatch({
      type: "REGISTER_CLIENT_USER",
      payload: data,
    });

  const handleNext = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper + 1 });
  };
  const handlePrev = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: helper - 1 });
  };

  const handleAddressSelect = (addressData) => {
    setData({
      ...data,
      address: addressData,
    });
  };

  const registerClient = () => {
    axios
      .post(`${URL}/register/client`, data)
      .then((response) => {
        JSON.stringify(response.data);
        console.log(response);
        if (response.statusCode === 200 || 201) {
          Swal.fire(
            "Regsitered Sucessfully!",
            "You will be able to login in a few moments",
            "success"
          ).then(history.push("/"));
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire(
            "Oops!",
            "Registration failed, either email already exist or details missing/not entered correctly, please try again.",
            "error"
          );
        } else if (err.status === 500) {
          Swal.fire("Oops!, please try again in a bit.", "error");
        } else if (err.status === 404) {
          Swal.fire(
            "Oops!, Could not find this email linked to any accounts. Please continue to register.",
            "error"
          );
        }
      });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AccDetails d={data} f={handleChange} />;
      case 1:
        return <LocationDetails f={handleAddressSelect} d={data.contact} />;
      case 2:
        return <ConfirmDetails />;
      default:
        return "STEPS COMPLETED";
    }
  };
  return (
    <>
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
              onClick={registerClient}
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
    </>
  );
};

export default ClientRegistration;
