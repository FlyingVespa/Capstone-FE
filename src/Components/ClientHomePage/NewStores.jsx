import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";

function NewStores({ user }) {
  return (
    <>
      <Image id="newstore" src={user?.info.img_user} />
    </>
  );
}

export default NewStores;
