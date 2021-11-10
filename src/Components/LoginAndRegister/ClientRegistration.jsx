import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Autocomplete,
  TextField,
  InputAdornment,
  Input,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Row, Col } from "react-bootstrap";

const ClientRegistration = (props) => {
  let history = useHistory();
  const URL = process.env.REACT_APP_API_URL;
  const cityList = [
    { city: "Messina", country: "Italy" },
    { city: "Roma", country: "Italy" },
    { city: "Milano", country: "Italy" },
    { city: "Bellville", country: "South Africa" },
    { city: "Durbanville", country: "South Africa" },
    { city: "Cape Town", country: "South Africa" },
  ];
  const dispatch = useDispatch();
  const dispatchData = () =>
    dispatch({
      type: "REGISTER_CLIENT_USER",
      payload: data,
    });
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };
  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };
  const options = cityList.map((option) => {
    const firstLetter = option.country.toUpperCase();
    return {
      firstLetter,
      ...option,
    };
  });
  const [data, setData] = useState({
    email: "client@test.com",
    lastname: "Smith",
    firstname: "John",
    password: "1234",
    username: "jonnyboy",
    service_area: "Messina",
  });

  const config = {
    method: "post",
    url: `${URL}/profile`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const registerClient = () => {
    axios
      .post(`${URL}/profile`, data)
      .then((response) => {
        JSON.stringify(response.data);
        console.log(response);
        if (response.statusCode === 200 || 201) {
          Swal.fire("Regsitered Sucessfully!", "You will be able to login in a few moments", "success").then(
            history.push("/")
          );
        }
      })

      .catch((err) => {
        if (err.response) {
          Swal.fire("Oops!", "Registration failed, either email already exist or details missing/not entered correctly, please try again.", "error");
        }
      });

   };

  return (
    <>
      <h1>Register A Standard User Account</h1>
      <div className="my-5">
        <TextField
          name="email"
          className="my-1"
          variant="standard"
          placeholder="Enter Your email used for login"
          label="Account Email"
          value={data.email}
          onChange={handleChange}
          fullWidth
        />
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          fullWidth
          label="password"
          name="pasword"
          id="password"
          type={vpassword ? "text" : "password"}
          value={data.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                {vpassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Row>
          <Col>
            <TextField
              name="firstname"
              className="my-1"
              variant="standard"
              placeholder="Enter Your Firstname"
              label="First Name"
              value={data.firstname}
              onChange={handleChange}
              fullWidth
            />
          </Col>
          <Col>
            <TextField
              name="lastname"
              className="my-1"
              variant="standard"
              placeholder="Enter Your Last Name"
              label="Last Name"
              value={data.lastname}
              onChange={handleChange}
              fullWidth
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <TextField
              name="username"
              className="my-1"
              variant="standard"
              placeholder="Your preffered nickname?"
              label="Username"
              value={data.username}
              onChange={handleChange}
              fullwidth
            />
          </Col>
        </Row>
        <TextField
          name="service_area"
          className="my-1"
          variant="standard"
          placeholder="Your preffered nickname?"
          label="Your City"
          value={data.service_area}
          onChange={handleChange}
          fullwidth
     />
      </div>
      <Button>RESET</Button>
      <Button onClick={registerClient}>REGISTER</Button>
    </>
  );
};

export default ClientRegistration;
