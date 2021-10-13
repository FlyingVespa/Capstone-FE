import { StayCurrentLandscape } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ContactDetails = ({ d, f }) => {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.formBusiness);

  return (
    <>
      <TextField
        placeholder="Enter email visible for customers"
        id="contact"
        name="email"
        label="Email"
        variant="standard"
        helperText="*Required - This email will be shared with customers"
        onChange={f}
        value={d.email}
        margin="normal"
        fullWidth
      />
      <TextField
        placeholder="Enter email visible for customers"
        id="contact"
        name="cell"
        label="MObile"
        variant="standard"
        helperText="*Required - This email will be shared with customers"
        onChange={f}
        value={d.cell}
        margin="normal"
        fullWidth
      />

      {/* <Row>
        <Col md={6}>
          <TextField
            name="cell"
            placeholder="Enter mobile"
            label="Mobile number"
            variant="standard"
            helperText="Required"
            onChange={handleChange}
            value={contact.cell}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            name="tel"
            placeholder="Enter landline"
            label="Landline number"
            variant="standard"
            helperText="Optional"
            onChange={handleChange}
            value={contact.tel}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            name="insta"
            placeholder="Enter WhatsApp Number"
            label="Mobile number"
            variant="standard"
            helperText="Optional"
            onChange={handleChange}
            value={contact.insta}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            name="whatsapp"
            placeholder="Enter whatsApp number"
            label="WhatsApp"
            variant="standard"
            helperText="Optional"
            onChange={handleChange}
            value={contact.whatsapp}
            fullWidth
          />
        </Col>
      </Row>
      <Button onClick={handleChange}> store</Button> */}
    </>
  );
};

export default ContactDetails;
