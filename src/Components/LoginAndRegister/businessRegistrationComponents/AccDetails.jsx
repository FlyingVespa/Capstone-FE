// Libraries
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, InputGroup } from "react-bootstrap";

//  Styling
import { TextField, IconButton, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { HiOutlineMail, HiOutlineDeviceMobile } from "react-icons/hi";
import {
  BiStore,
  BiUserCircle,
  BiShield,
  BiWindowAlt,
  BiCategory,
  BiBuildingHouse,
} from "react-icons/bi";
import { Row, Col } from "react-bootstrap";

// Components

const AccDetails = ({ d, f }) => {
  const dispatch = useDispatch();
  const [accDetails, setAccDetails] = useState({});
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const handleChange = ({ target }) => {
    setAccDetails({ ...accDetails, [target.id]: target.value });
    f(accDetails);
  };

  return (
    <div className="acc-details">
      <FormLabel component="legend">Basic Account Details</FormLabel>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BiStore className="mx-2" />
          Company Name
        </InputGroup.Text>
        <FormControl
          placeholder="What is your company name?"
          id="businessname"
          value={accDetails.businessname}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <Row>
        <Col md={12} lg={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <HiOutlineMail className="mx-2" /> Email
            </InputGroup.Text>
            <FormControl
              placeholder="Enter email visible for customers"
              id="email"
              value={accDetails.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Col>
        <Col md={12} lg={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <BiShield className="mx-2" /> Password
            </InputGroup.Text>
            <FormControl
              placeholder="Your preffered username?"
              id="password"
              type={vpassword ? "text" : "password"}
              value={accDetails.password}
              onChange={handleChange}
              required
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {vpassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <BiUserCircle className="mx-2" />
              Username
            </InputGroup.Text>
            <FormControl
              placeholder="Your preffered username?"
              id="username"
              value={accDetails.username}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Col>

        <Col md={12} lg={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <BiBuildingHouse className="mx-2" /> Category
            </InputGroup.Text>
            <FormControl
              placeholder="Type of company?"
              id="category"
              value={accDetails.category}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Col>
      </Row>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BiWindowAlt className="mx-2" />
          Url
        </InputGroup.Text>
        <FormControl
          placeholder="Choose Unique Url, recommned same as business name"
          id="url"
          value={accDetails.url}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BiBuildingHouse className="mx-2" /> About
        </InputGroup.Text>
        <FormControl
          placeholder="Give short description of your business"
          id="bio"
          value={accDetails.bio}
          onChange={handleChange}
          required
        />
      </InputGroup>
    </div>
  );
};

export default AccDetails;
