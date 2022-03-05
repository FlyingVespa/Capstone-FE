import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Button, Accordion } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaPhoneSquareAlt,
} from "react-icons/fa";

function About({ data }) {
  let windowWidth = window.innerWidth;
  return (
    <>
      <Col sm={12} md={7}>
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
                <Row className="my-1">
                  <Col>
                    <div className="product-container">
                      <p>{data.contact.whatsapp}</p>
                    </div>
                  </Col>
                  <Col>
                    <div className="product-container">
                      <p>{data.contact.whatsapp}</p>
                    </div>
                  </Col>
                  <Col>
                    <div className="product-container">
                      <p>{data.contact.email}</p>
                    </div>
                  </Col>
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
            <Row className="my-1">
              <Col>
                <div>
                  <p>{data.contact.whatsapp}</p>
                </div>
              </Col>
              <Col>
                <div>
                  <p>{data.contact.whatsapp}</p>
                </div>
              </Col>
              <Col>
                <div>
                  <p>{data.contact.pub_email}</p>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </>
  );
}

export default About;
