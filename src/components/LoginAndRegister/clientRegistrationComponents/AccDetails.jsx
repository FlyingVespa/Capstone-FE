import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Row, Col } from "react-bootstrap";

const AccDetails = ({ d, f }) => {
  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  return (
    <div>
      <TextField
        name="email"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={d.email}
        onChange={f}
      />
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        label="password"
        name="password"
        id="password"
        type={vpassword ? "text" : "password"}
        value={d.password}
        onChange={f}
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
            value={d.firstname}
            onChange={f}
          />
        </Col>
        <Col>
          <TextField
            name="lastname"
            className="my-1"
            variant="standard"
            placeholder="Enter Your Last Name"
            label="Last Name"
            value={d.lastname}
            onChange={f}
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
            value={d.username}
            onChange={f}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccDetails;
