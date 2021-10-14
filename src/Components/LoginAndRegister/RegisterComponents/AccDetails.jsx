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

const AccDetails = ({
  v,
  f,
  d,
  i,
  handleClickShowPassword,
  handleMouseDownPassword,
  handlePasswordChange,
}) => {
  // const dispatch = useDispatch();
  // const form = useSelector((s) => s.formBusiness);

  return (
    <div className="my-5">
      <TextField
        id="name"
        name="basic"
        className="my-1"
        variant="standard"
        placeholder="Enter Your Business Name"
        label="Business Name"
        value={d.name}
        onChange={f}
        fullWidth
      />

      <TextField
        id="email"
        name="basic"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={d.email}
        onChange={f}
        fullWidth
        helperText="*Required - not shared with public"
      />
      <Row>
        <Col>
          <TextField
            name="basic"
            id="username"
            className="my-1"
            variant="standard"
            placeholder="Your preffered nickname?"
            label="Username"
            value={d.username}
            onChange={f}
          />
        </Col>
        <Col>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            label="password"
            name="basic"
            id="password"
            type={v.showPassword ? "text" : "password"}
            value={d.password}
            onChange={f}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {d.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <TextField
            name="basic"
            id="url"
            className="my-1"
            variant="standard"
            placeholder="Enter Your preffered"
            label="Choose Custom Url"
            value={d.url}
            onChange={f}
            fullWidth
            helperText="*Required - an address online where customers can find your business"
          />
        </Col>
        <Col>
          <TextField
            id="category"
            name="basic"
            label="Bussines Category"
            variant="standard"
            placeholder="Tell us about you business"
            value={d.category}
            onChange={f}
            multiline
            fullWidth
          />
        </Col>
      </Row>
      <TextField
        id="bio"
        name="info"
        label="Describe the business"
        variant="standard"
        placeholder="Tell us about you business"
        value={i.bio}
        onChange={f}
        multiline
        fullWidth
      />
    </div>
  );
};

export default AccDetails;
