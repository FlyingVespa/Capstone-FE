import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { FiTool } from "react-icons/fi";

function Services({ services }) {
  return (
    <Container>
      <p>
        <FiTool className="mx-2" />
        SERVICES
      </p>
      <Row>
        {services &&
          services.map((item, i) => {
            return (
              <Col key={i} xs={6} sm={6} md={4} xl={3}>
                <Container>
                  <div className="product-container">
                    <div className="product-item">
                      <span>{item}</span>
                    </div>
                  </div>
                </Container>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Services;
