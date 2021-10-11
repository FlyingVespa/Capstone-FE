import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

function About() {
  return (
    <Container className="m-1 -p1">
      <p>
        <FiInfo /> ABOUT
      </p>
      <Container>
        <Row>
          <Col md={8}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              minima neque sequi, aliquam odit nemo tempore molestias veniam
              quidem? Numquam rem fuga facere. Nihil placeat veritatis qui
              nesciunt commodi. Dicta?
            </p>
          </Col>
          <Col>
            <Row></Row>
            <Col className="m-2">
              <Button>Contact Us</Button>
            </Col>
            <Col className="m-2">
              <Button disabled>TEL 2354 35 4352</Button>
            </Col>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
