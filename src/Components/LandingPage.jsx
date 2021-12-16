// Libraries
import { useSelector } from "react";
// styling
import shopping from "../assets/images/shopping.svg";
import "./ClientHomePage/clienthomepage.css";
import { Container, Col, Button, Row, Image } from "react-bootstrap";
// Components
import ListPageDetails from "./ListPageDetails";

const LandingPage = () => {
  // const auth = useSelector((s) => s.helper.loggedin);
  // const modalStatus = useSelector((s) => s.helper.loginModal);

  return (
    <>
      <div className="landing_page">
        <Container className="landing_page" id="landing_page">
          <Image src={shopping} id="landing_background" />

          <Row>
            <div>
              <h1 className="m-0 p-0">Buy Local</h1>
            </div>
            <Col>
              <p className="m-0 p-0">.online</p>
              <p>It takes you to start the trend</p>
              <p>
                Support the local businesses who support the area where you
                live, work and play
              </p>
              <div className="btn-explore">
                <Button href="/business" variant="light">
                  List Your Business For Free
                </Button>
              </div>
              <p>Start exploring listed businesses </p>
              {/* <p>{autsh}</p> */}
              {/* {modalStatus ? <p>true</p> : <p>false</p>} */}
            </Col>
            <Col className="m-2"></Col>
          </Row>
        </Container>
      </div>
      <ListPageDetails />
    </>
  );
};

export default LandingPage;
