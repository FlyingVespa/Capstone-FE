import React from "react";
import { Col, Row, Container, FormControl, Button } from "react-bootstrap";

import { FiEdit2, FiSettings } from "react-icons/fi";

function ClientSettings() {
  return (
    <>
      <Container className="settingClient">
        <h4>Settings</h4>
        <Row>
          <Col>Preffered Location</Col>
          <Col>
            <p>Messina</p>
          </Col>
        </Row>
        <Row>
          <Col>First Name</Col>
          <Col>
            <FormControl />
          </Col>
        </Row>
        <Row>
          <Col>Profile Image</Col>
          <Col>
            <FormControl />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ClientSettings;
