import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function SavedStores({ users }) {
  return (
    <Container className="savedStores">
      <p>Saved Stores</p>
      <Row>
        {users.map((user) => (
          <Col>
            <Image src={user.info.img_user} />
            <p>{user.basic.name}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SavedStores;
