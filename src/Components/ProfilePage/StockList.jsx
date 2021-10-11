import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { TiThListOutline } from "react-icons/ti";

function StockList() {
  return (
    <Container className="stocklist">
      <Row>
        <Col>
          <p>
            <TiThListOutline /> STOCKLIST
          </p>
        </Col>
        <Col>
          <Button className="float-right">See All</Button>
        </Col>
      </Row>

      <Container>
        {/* Show only first 20 items */}
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

export default StockList;
