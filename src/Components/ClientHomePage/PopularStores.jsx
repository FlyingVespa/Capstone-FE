import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
function PopularStores() {
  return (
    <Container className="popularStores">
      <p>Popular Stores</p>
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

export default PopularStores;
