import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
import ShoppingItem from "./ShoppingItem";

const ShoppingList = () => {
  return (
    <Container className="shoppingList">
      <h4>Shopping List</h4>
      <Row>
        <ShoppingItem />
      </Row>
    </Container>
  );
};

export default ShoppingList;
