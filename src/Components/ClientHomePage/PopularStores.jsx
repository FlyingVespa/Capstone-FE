import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
function PopularStores({ users }) {
  return (
    <Container className="popularStores">
      <p>Popular Stores</p>
      <Row>
        {users.map((user) => (
          <Col>
            <Image src={user.info.img_logo} />
            <p>{user.basic.name}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PopularStores;
