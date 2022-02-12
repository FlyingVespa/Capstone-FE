// Libraries
import { useSelector } from "react";
// styling
import shopping from "../assets/images/shopping.svg";
import "./ClientHomePage/clienthomepage.css";
import { Container, Col, Button, Row, Image } from "react-bootstrap";
// Components
import ListPageDetails from "./LandingPage/ListPageDetails";

const LandingPage = () => {
  return (
    <>
      <div className="landing page">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Row>
                <div className="main-text">
                  <Row>
                    <h1>Buy Local</h1>
                    <p>.online</p>
                  </Row>
                </div>
                <p className="p-0">
                  It takes you to start the trend. Support the local businesses
                  who support the area where you live, work and play
                </p>
                <div className="btn-explore">
                  <Button href="/business" variant="light">
                    List Your Business For Free
                  </Button>
                </div>
              </Row>
            </Col>
            <Col sm={12} md={6}>
              <div className="image">
                <Image src={shopping} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LandingPage;
