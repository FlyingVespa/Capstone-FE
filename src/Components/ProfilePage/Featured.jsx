import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import { TiBookmark } from "react-icons/ti";

function Featured() {
  return (
    <Container className=" featured m-1 -p1 mx-auto">
      <p>
        <TiBookmark /> FEATURED
      </p>
      <Container>
        <Row>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0">
            <Image src="./logo512.png" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Featured;
