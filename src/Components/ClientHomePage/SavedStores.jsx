import React from "react";
import { useState } from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function SavedStores({ user }) {
  const [selected, setSelected] = useState("");
  return (
    <Container className="savedStores">
      <p>Saved Stores</p>
      <Row>
        {user.map((a) => (
          <Col>
            <Image
              id="newstore"
              src={a.info.img_user}
              value={a.basic.name}
              onClick={(e) => setSelected(e.target.value)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SavedStores;
