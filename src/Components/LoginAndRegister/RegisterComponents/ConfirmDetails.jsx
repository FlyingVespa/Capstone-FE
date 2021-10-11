import React, { Component } from "react";
import { Col, Row, Navbar, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ConfirmDetails = ({ d }) => {
  const basic = useSelector((s) => s.basic);
  const location = useSelector((s) => s.location);
  const contact = useSelector((s) => s.contact);
  // const times = useSelector((s) => s.times);

  // const continues = (e) => {
  //   e.preventDefault();
  //   // PROCESS FORM //
  //   props.nextStep();
  // };

  // const back = (e) => {
  //   e.preventDefault();
  //   props.prevStep();
  // };
  const times = Object.keys(d.times);
  const data = Object.keys(d.basic);

  return (
    <>
      <Row id="confirm-times">
        {times.map((day) => (
          <>
            <Row>
              <Col md={4}>
                <p id="times-day" style={{ textTransform: "capitalize" }}>
                  {day}
                </p>
              </Col>
              <Col md={4}>
                <p id="times-open">{d.times[day].open}</p>
              </Col>
              <Col md={4}>
                <p id="times-closed">{d.times[day].closed}</p>
              </Col>
            </Row>
          </>
        ))}
      </Row>
      <Row>
        <Col>
          <p>Account Login Email</p>
        </Col>
        <Col>
          <p>{d.basic.email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Name</p>
        </Col>
        <Col>
          <p>{d.basic.name}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Username</p>
        </Col>
        <Col>
          <p>{d.basic.username}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Category</p>
        </Col>
        <Col>
          <p>{d.basic.category}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Password</p>
        </Col>
        <Col>
          <p>{d.basic.password}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Delivery Service</p>
        </Col>
        <Col>
          <p>{d.basic.delivery}</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>Business Email (public)</p>
        </Col>
        <Col>
          <p>{d.contact.email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Mobile</p>
        </Col>
        <Col>
          <p>{d.contact.cell}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Landline</p>
        </Col>
        <Col>
          <p>{d.contact.tel}</p>
        </Col>
      </Row>

      <br />
    </>
  );
};

export default ConfirmDetails;
