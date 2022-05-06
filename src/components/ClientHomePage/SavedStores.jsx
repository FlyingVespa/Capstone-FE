import { useState, useEffect, useRef } from "react";
import { Container, Image, Col, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

import FavStore from "./FavStore";

const SavedStores = () => {
  return (
    <Container className="storeFav">
      <h4>Saved Stores</h4>
      <Row>
        <FavStore />
      </Row>
    </Container>
  );
};

export default SavedStores;
