// Libraries
import { useSelector } from "react";
// styling
import shopping from "../assets/images/shopping.svg";
import "./ClientHomePage/clienthomepage.css";
import { Container, Col, Button, Row, Image } from "react-bootstrap";
// Components

const LandingPage = () => {
  return (
    <>
      <div className="landing page">
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
              <Button
                href="/business"
                variant="light"
                id="btn-landing"
                className="m-0"
              >
                Explore Businesses
              </Button>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          id="wave"
        >
          <path
            fill="#75AE6A"
            fill-opacity="1"
            d="M0,0L80,48C160,96,320,192,480,213.3C640,235,800,181,960,181.3C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          id="wave1"
        >
          <path
            fill="#5B8A52"
            fill-opacity="1"
            d="M0,256L48,229.3C96,203,192,149,288,133.3C384,117,480,139,576,154.7C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          id="wave2"
        >
          <path
            fill="#699D5F"
            fill-opacity="1"
            d="M0,224L80,224C160,224,320,224,480,192C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default LandingPage;
