import React from "react";
import {
  Jumbotron,
  Image,
  Container,
  Nav,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import fishshop from "../fishshop.jpg";
import { Star } from "react-bootstrap-icons";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";
import Promotions from "./ProfilePage/Promotions";
import StockList from "./ProfilePage/StockList";
import Map from "./ProfilePage/Map";

function ProfilePage() {
  return (
    <div>
      <Jumbotron>
        <Image src={fishshop} />
      </Jumbotron>
      <Container className="main mb-5">
        <Container
          className="header mb-5 p-5"
          style={{ boxShadow: "1px 1px 10px grey" }}
        >
          <IoIosStarOutline className="icon star" />
          <Row className="">
            <Col xs={2} className="Logo">
              <Logo />
            </Col>
            <Col>
              <h1>
                Business Name <IoIosStarOutline className="icon star" />
              </h1>
              <span>Fishery in Messsina </span>
              <IoMdAlarm />
              <span> open</span>
              <Button>
                <Nav href="#location">Locate us</Nav>
              </Button>
            </Col>
          </Row>
        </Container>
        <About />
        <hr className="" />
        <Services />
        <hr className="" />
        <Promotions />
        <hr className="" />
        <Featured />
        <hr className="" />
        <StockList />
        <Button>Create Shopping List</Button>
        <hr className="" />
        <Map id="location" />
      </Container>
    </div>
  );
}

export default ProfilePage;
