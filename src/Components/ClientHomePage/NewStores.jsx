import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function NewStores({ users }) {
  return (
    <Container className="newStores">
      <p>New Stores</p>
      <Row>
        {users.map((user) => (
          <Col>
            <Image src={user.info.img_banner} />
            <p>{user.basic.name}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewStores;
