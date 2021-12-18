import React from "react";
import { useHistory } from "react-router";
import {
  CardActions,
  CardContent,
  Card,
  CardMedia,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { GrMapLocation } from "react-icons/gr";

import { Col, Row, Badge } from "react-bootstrap";

const ShopCard = ({ user }) => {
  let history = useHistory();
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
          <Divider/>
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
        {/* <CardActions>
          <Button onClick={() => history.push(`/business/${user._id}`)}>
            Visit
          </Button>
        </CardActions> */}
      </Card>
    </Col>
  );
};

export default ShopCard;
