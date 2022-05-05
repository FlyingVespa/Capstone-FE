// Libraries
import { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate } from "react-router";
import cities from "cities.json";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
// styling

import shopping from "../assets/images/shopping.svg";
import "./ClientHomePage/clienthomepage.css";
import { Container, Col, Button, Row, Image } from "react-bootstrap";
import { setOptions } from "leaflet";
import axios from "axios";
// Components

const LandingPage = () => {
  const navigate = useNavigate();
  const [defaultCity, setDefaultCity] = useState("");
  const [filterData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const searchInput = useRef();
  const style0 = {
    display: "flex",
    border: " 2px solid red",
    justifyContent: "center",
    alignItems: "center",
    flexFflow: "row wrap",
  };
  const style1 = {
    flexGrow: "1",
  };

  const style2 = {
    border: " 2px solid blue",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  const style3 = {
    border: " 2px solid pink",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  const style4 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: " 2px solid pink",
    borderRadius: "10px",
    backgroundColor: "#FFF",
  };
  let data = cities;

  // =========================================================

  return (
    <div style={style0}>
      <Container>
        <Row>
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 1 }}
          >
            <h1>Support the area where you live, work and play</h1>
          </Col>
          <Col
            style={{ marginTop: 0 }}
            xs={{ span: 12, order: 3 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 3 }}
          >
            <Row className="g-2">
              <Col md>
                <Button onClick={() => navigate("/business")}>
                  Browse Local Stores
                </Button>
              </Col>
            </Row>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 12, order: 3 }}
            lg={{ span: 6, order: 2 }}
          >
            <Image src={shopping} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
