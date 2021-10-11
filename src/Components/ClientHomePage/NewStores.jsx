import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function NewStores() {
  return (
    <Container className="newStores">
      <p>New Stores</p>
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

export default NewStores;
