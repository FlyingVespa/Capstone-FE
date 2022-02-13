import React from "react";
import { useNavigate } from "react-router";
import { CardContent, Card, CardMedia, Divider } from "@mui/material";
import { GrMapLocation } from "react-icons/gr";

import { Col, Row, Badge } from "react-bootstrap";

const ShopCard = ({ user }) => {
  let navigate = useNavigate();
  return (
    <Col lg={2} md={4} xs={6} className="align-items-stretch">
      <Card className="shop-card p-0 m-0 h-100">
        <div>
          <Badge className="category-badge" color="success">
            {user.category}
          </Badge>
          <CardMedia
            component="img"
            height="140"
            image={user.img_logo}
            alt="green iguana"
          />
        </div>
        <CardContent className="text-center m-0">
          <h5>{user.businessname}</h5>
          <Divider />
          <div>
            <Row className="my-1">
              <Col xs={3}>
                <GrMapLocation />
              </Col>
              <Col xs={9}>
                <p className="m-0">{user.location.lat}</p>
              </Col>
            </Row>
          </div>
        </CardContent>
      </Card>
    </Col>
  );
};

export default ShopCard;
