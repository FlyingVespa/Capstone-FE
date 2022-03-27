// libraries
import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Col, Row } from "react-bootstrap";
// import
// styling
// components
// import { MdAddBusiness } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";

const FavStore = () => {
  const [favStores, setFavStores] = useState(null);

  return (
    <>
      {favStores !== null ? (
        <Col xs={6} md={4} lg={3}>
          <Card className="favStoreCard">
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
              <Button className="favStoreBtn" variant="outline-secondary">
                <BiAddToQueue />
                Find Stores
              </Button>
            </span>
          </Row>
        </>
      )}
    </>
  );
};

export default FavStore;
