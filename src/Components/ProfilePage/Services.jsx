import React from "react";
import { Container, Row } from "react-bootstrap";

import { FiTool } from "react-icons/fi";

function Services({ services }) {
  return (
    <Container className="m-1 -p1">
      <p>
        <FiTool /> SERVICES
      </p>
      <Container>
        <Row>
          <ul>
            {services.map((item) => {
              return (
                <li>
                  <p>{item}</p>
                </li>
              );
            })}
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
