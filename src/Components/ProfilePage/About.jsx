import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Button, Accordion } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaPhoneSquareAlt,
} from "react-icons/fa";

function About({ data, contact }) {
  let windowWidth = window.innerWidth;
  return (
    <>
      {data !== undefined && (
        <Col sm={12} md={7} className="profile-about">
          {windowWidth < 720 ? (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FiInfo className="mx-2" />
                  ABOUT US
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <p>{data.bio}</p>
                  </Row>
                  <Row>
                    <span>Address:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                  <Row>
                    <span>Phone:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                  <Row>
                    <span>Email:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ) : (
            <>
              <Row>
                <p>
                  <FiInfo className="mx-2" />
                  ABOUT US
                </p>
                <p>{data.bio}</p>
              </Row>
              <Row>
                <Col>
                  <span>Address:</span>
                  <span className="mx-2">{contact?.cell}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Phone:</span>
                  <span className="mx-2">{contact?.cell}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Email:</span>
                  <span className="mx-2">{contact?.cell}</span>
                </Col>
              </Row>
            </>
          )}
        </Col>
      )}
    </>
  );
}

export default About;
