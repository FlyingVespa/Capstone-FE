import React from "react";
import { Container, Row } from "react-bootstrap";

import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiTool } from "react-icons/fi";

function Services() {
  return (
    <Container className="m-1 -p1">
      <p>
        <FiTool /> SERVICES
      </p>
      <Container>
        <Row>
          <ul>
            <li>Birthday parties</li>
            <li>Birthday parties</li>
            <li>Birthday parties</li>
            <li>Birthday parties</li>
          </ul>
        </Row>
      </Container>
    </Container>
  );
}

export default Services;
