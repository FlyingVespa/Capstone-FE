import React from "react";
import { Container, Jumbotron, Image } from "react-bootstrap";
import { TiMap } from "react-icons/ti";

import MapImg from "../../map.jpg";
function Map() {
  return (
    <Container>
      <p>
        <TiMap /> Location
      </p>
      <Jumbotron>
        <Image src={MapImg} />
      </Jumbotron>
    </Container>
  );
}

export default Map;
