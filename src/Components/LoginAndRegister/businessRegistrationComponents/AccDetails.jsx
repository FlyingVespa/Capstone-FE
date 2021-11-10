import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Input,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

const AccDetails = ({
  datas,
  handleChange,
  handleMouseDownPassword,
}) => {
  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
const handleClickShowPassword = () => {
  dispatch({type: "SHOW_PASSWORD", payload: !vpassword})
}


  const { bio, category, businessname, email, username, url, password } = datas;
  return (
    <div className="my-5">
      <TextField
        id="businessname"
        className="my-1"
        variant="standard"
        placeholder="Enter Your Business Name"
        label="Business Name"
        value={businessname}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        id="email"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={email}
        onChange={handleChange}
        fullWidth
        helperText="*Required - not shared with public"
      />
      <Row>
        <Col>
          <TextField
            id="username"
            className="my-1"
            variant="standard"
            placeholder="Your preffered nickname?"
            label="Username"
            value={username}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            label="password"
            name="pasword"
            id="password"
            type={vpassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={ e => { e.preventDefault()}}
                >
                  {vpassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            name="basic"
            id="url"
            className="my-1"
            variant="standard"
            placeholder="Enter Your preffered"
            label="Choose Custom Url"
            value={url}
            onChange={handleChange}
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
            value={category}
            onChange={handleChange}
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
        value={bio}
        onChange={handleChange}
        multiline
        fullWidth
      />
    </div>
  );
};

export default AccDetails;
