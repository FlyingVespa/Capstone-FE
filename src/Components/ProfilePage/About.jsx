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
  const [showTradingHours, setShowTradingHours] = useState(false);

  const handleCloseTradingHours = () => setShowTradingHours(false);
  const handleShowTradingHours = () => setShowTradingHours(true);

  const today = new Date();
  const days = today.getDay();

  return (
    <>
      <Col sm={12} md={7}>
        <Row>
          <p>
            <FiInfo className="mx-2" />
            ABOUT US
          </p>
          <p>{data.bio}</p>
        </Row>
        <Row className="my-1">
          <Col>
            <FaWhatsappSquare className="fa-icon whatsapp" />
          </Col>
          <Col>
            <FaPhoneSquareAlt className="fa-icon phone" />
          </Col>
          <Col>
            <FaFacebookSquare className="fa-icon facebook" />
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default About;
