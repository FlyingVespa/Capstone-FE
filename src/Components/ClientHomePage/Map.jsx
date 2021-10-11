import React from "react";
import MapImg from "../../map.jpg";
import { Container, Jumbotron, Image } from "react-bootstrap";

function Map() {
  return (
    <Jumbotron>
      <Image src={MapImg} />
    </Jumbotron>
  );
}

export default Map;
