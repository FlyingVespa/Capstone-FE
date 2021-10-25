import { StayCurrentLandscape } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

const ContactDetails = ({ d, f }) => {
  return (
    <>
      <TextField
        placeholder="Enter email visible for customers"
        id="email"
        name="contact"
        label="Email"
        variant="standard"
        helperText="This email will be shared with customers"
        onChange={f}
        value={d.email}
        fullWidth
        required
      />

      <Row>
        <Col md={6}>
          <TextField
            id="cell"
            name="contact"
            placeholder="Enter mobile"
            label="Mobile number"
            variant="standard"
            helperText="Required"
            onChange={f}
            value={d.cell}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            id="tel"
            name="contact"
            placeholder="Enter landline"
            label="Landline number"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.tel}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            id="insta"
            name="contact"
            placeholder="Enter WhatsApp Number"
            label="Mobile number"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.insta}
            fullWidth
          />
        </Col>
        <Col md={6}>
          <TextField
            id="whatsapp"
            name="contact"
            placeholder="Enter whatsApp number"
            label="WhatsApp"
            variant="standard"
            helperText="Optional"
            onChange={f}
            value={d.whatsapp}
            fullWidth
          />
        </Col>
      </Row>
    </>
  );
};

export default ContactDetails;
