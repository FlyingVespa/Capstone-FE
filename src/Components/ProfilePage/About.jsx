import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaPhoneSquareAlt,
} from "react-icons/fa";

import TradingHoursModal from "./TradingHoursModal";

function About({ about }) {
  const [showTradingHours, setShowTradingHours] = useState(false);

  const handleCloseTradingHours = () => setShowTradingHours(false);
  const handleShowTradingHours = () => setShowTradingHours(true);

  const profileData = useSelector((s) => s.users.user);

  let operatingHours = Object.keys(profileData.times);
  const handleclick = (e) => {
    console.log("Test", operatingHours);
  };
  const today = new Date();
  const days = today.getDay();

  const sss = () => {
    if (document.getElementById("times-day").innerHTML == { days }) {
    }
  };

  return (
    <>
      <Container className="m-1 -p1">
        <p>
          <FiInfo /> ABOUT
        </p>
        <Container>
          <Row>
            <Col md={8}>
              <p>{about}</p>
            </Col>
            <Col>
              <Col className="trading-hours m-2">
                <Button variant="primary" onClick={handleShowTradingHours}>
                  Trading Hours
                </Button>
                <button onClick={handleclick}>Testing</button>
                <FaFacebookSquare />
                <FaWhatsappSquare />
                <FaPhoneSquareAlt />
              </Col>
            </Col>
          </Row>
        </Container>
      </Container>

      <Modal show={showTradingHours} onHide={handleCloseTradingHours} centered>
        <Modal.Header closeButton>
          <Modal.Title>Trading Hours</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {operatingHours.map((day, i) => (
            <>
              <Row>
                <Col md={4}>
                  {days === i + 1 ? (
                    <p id="times-day" style={{ textTransform: "capitalize" }}>
                      <b>{day}</b>
                    </p>
                  ) : (
                    <p>{day}</p>
                  )}
                </Col>
                {profileData.times[day].trading !== true ? (
                  <Col>
                    <p>Closed</p>
                  </Col>
                ) : (
                  <>
                    <Col md={4}>
                      <p>{profileData.times[day].open}</p>
                    </Col>
                    <Col md={4}>
                      <p>{profileData.times[day].closed}</p>
                    </Col>
                  </>
                )}
              </Row>
            </>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default About;
