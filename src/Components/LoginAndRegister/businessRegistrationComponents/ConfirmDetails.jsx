import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ConfirmDetails = ({ details }) => {
  const regBusiness = useSelector((s) => s.users.registerBusiness);
  const operatingHours = Object.keys(details.times);
  const {
    email,
    username,
    shipping,
    password,
    businessname,
    category,
    location,
    address,
    contact,
    times,
  } = regBusiness;
  return (
    <>
      <Row id="confirm-times">
        <p>Operating Hours</p>
        {operatingHours.map((day) => (
          <>
            <Row>
              <Col md={4}>
                <p id="times-day" style={{ textTransform: "capitalize" }}>
                  {day}
                </p>
              </Col>
              {details.times[day].trading !== true ? (
                <Col>
                  <p>Closed</p>
                </Col>
              ) : (
                <>
                  <Col md={4}>
                    <p id="times-open">{details.times[day].open}</p>
                  </Col>
                  <Col md={4}>
                    <p id="times-closed">{details.times[day].closed}</p>
                  </Col>
                </>
              )}
            </Row>
          </>
        ))}
      </Row>
      <Row>
        <Col>
          <p>Account Login Email</p>
        </Col>
        <Col>
          <p>{email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Name</p>
        </Col>
        <Col>
          <p>{businessname}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Username</p>
        </Col>
        <Col>
          <p>{username}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Category</p>
        </Col>
        <Col>
          <p>{category}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Password</p>
        </Col>
        <Col>
          <p>{password}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Delivery Service</p>
        </Col>
        <Col>
          <p>{shipping}</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>Business Email (public)</p>
        </Col>
        <Col>
          <p>{contact?.pub_email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Mobile</p>
        </Col>
        <Col>
          <p>{contact?.cell}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Business Landline</p>
        </Col>
        <Col>
          <p>{contact?.tel}</p>
        </Col>
      </Row>

      <br />
    </>
  );
};

export default ConfirmDetails;
