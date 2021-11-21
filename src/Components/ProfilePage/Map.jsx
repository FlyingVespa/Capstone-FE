import React from "react";
import { Container, Jumbotron, Image } from "react-bootstrap";
import { TiMap } from "react-icons/ti";

function Map() {
  return (
    <Container>
      <p>
        <TiMap /> Location
      </p>
      <Jumbotron>
        <Image />
      </Jumbotron>
    </Container>
  );
}

export default Map;
