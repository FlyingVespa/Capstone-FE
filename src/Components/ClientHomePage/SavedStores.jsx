import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function SavedStores() {
  return (
    <Container className="savedStores">
      <p>Saved Stores</p>
      <Row>
        <Col>
          <Image src="./logo192.png" />
        </Col>
        <Col>
          <Image src="./logo192.png" />
        </Col>
        <Col>
          <Image src="./logo192.png" />
        </Col>
        <Col>
          <Image src="./logo192.png" />
        </Col>
        <Col>
          <Image src="./logo192.png" />
        </Col>
      </Row>
    </Container>
  );
}

export default SavedStores;
