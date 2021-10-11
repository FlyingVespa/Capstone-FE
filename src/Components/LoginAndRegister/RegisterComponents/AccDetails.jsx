import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

const category = [
  "Fishery",
  "Flowers",
  "Auto Repair",
  "Produce",
  "Resturant",
  "Beauty",
  "Construction",
];
const deliveryDistance = [
  "No Delivery Serive",
  "On Request",
  "Less than 2km",
  "Less than 5km",
  "Less than 10km",
];

const AccDetails = ({
  v,
  f,
  d,
  handleClickShowPassword,
  handleMouseDownPassword,
  handlePasswordChange,
}) => {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.formBusiness);

  // const [values, setValues] = useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });

  // const handlePasswordChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div className="my-5">
      <TextField
        name="email"
        id="basic"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={d.email}
        onChange={f}
        fullWidth
        helperText="*Required - not shared with public"
      />
      <TextField
        name="username"
        id="basic"
        className="my-1"
        variant="standard"
        placeholder="Enter Your preffered"
        label="Username"
        value={d.username}
        onChange={f}
        fullWidth
        helperText="*Required - not shared with public"
      />

      <FormControl variant="standard" fullWidth className="mb-3">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          name="password"
          id="password"
          type={v.showPassword ? "text" : "password"}
          value={d.password}
          onChange={handlePasswordChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {v.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <hr className="my-4" />
      <TextField
        id="basic"
        name="name"
        className="my-1"
        variant="standard"
        placeholder="Business Name"
        label="Business Name"
        value={d.businessName}
        onChange={f}
        fullWidth
        helperText="*Required - not shared with public"
      />
      {/* <Row>
        <Col>
          <Autocomplete
            name="category"
            className="my-3"
            value={basics.category}
            // onInputChange={inputChange}
            id="category"
            options={category}
            renderInput={(params) => (
              <TextField
                {...params}
                name="category"
                label="Type of business"
                value={basics.category}
                variant="standard"
                onChange={handleChange}
              />
            )}
          />
        </Col>
        <Col>
          <Autocomplete
            name="delivery"
            className="my-3"
            value={basics.delivery}
            // onInputChange={inputChange}
            id="delivery"
            options={deliveryDistance}
            renderInput={(params) => (
              <TextField
                name="delivery"
                {...params}
                label="Delivery Service"
                value={basics.delivery}
                variant="standard"
                onChange={handleChange}
              />
            )}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default AccDetails;
