import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
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
      <Container>
        <h4>WHO WE ARE</h4>
        <p>{data.bio}</p>
      </Container>
    </>
  );
}

export default About;
