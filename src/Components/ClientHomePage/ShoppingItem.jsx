import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button, Col, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";

const ShoppingItem = () => {
  const [itemList, setItemList] = useState(null);
  let navigate = useNavigate();

  return (
    <>
      {itemList !== null && itemList.length > 0 ? (
        <Col xs={6} md={4} lg={3}>
          <Card className="itemList">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <>
          <Row>
            <span>
              No favorite stores added{" "}
              <Button
                className="favStoreBtn"
                variant="outline-secondary"
                onClick={() => navigate("/business")}
              >
                <BiAddToQueue />
                Add Items to List
              </Button>
            </span>
          </Row>
        </>
      )}
    </>
  );
};

export default ShoppingItem;
