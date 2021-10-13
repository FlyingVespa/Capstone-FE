import { useEffect, useState } from "react";
import {
  Container,
  Jumbotron,
  Col,
  FormControl,
  Button,
  Row,
  Image,
} from "react-bootstrap";
import NewStores from "./ClientHomePage/NewStores";
import PopularStores from "./ClientHomePage/PopularStores";
import SavedStores from "./ClientHomePage/SavedStores";
import Map from "./ClientHomePage/Map";
import local from "../local.png";
import shopping from "../shopping.png";
import landingpage from "../landingpage.jpeg";
import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
function LandingPage({ props }) {
  const URL = process.env.REACT_APP_API_URL;
  const [usersData, setUsersData] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const ss = Object.keys(usersData);
  return (
    <>
      <Image src={shopping} id="landing_background" />
      <Container className="landing_page" id="landing_page">
        <Row>
          <div>
            <h1>Buy Local</h1>
            <p className="m-0 p-0">.online</p>
          </div>
        </Row>
        <Row>
          <Col>
            <p>It takes you to start the trend</p>
            <p>
              Support the local businesses who support the area where you live,
              work and play
            </p>
            <div className="btn-explore">
              <Button variant="light">List Your Business For Free</Button>
            </div>
            <p>start exploring listed businesses</p>
          </Col>
          <Col className="m-2">
            <Col className="m-3">
              {/* <FormControl></FormControl>
              <FormControl></FormControl>
              <Button>Login</Button>
            </Col>
            <Col className="m-3">
              <Button>Add your Business</Button> */}
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
