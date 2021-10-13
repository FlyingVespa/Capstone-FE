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
import ListPageDetails from "./ListPageDetails";
function LandingPage({ props }) {
  const URL = process.env.REACT_APP_API_URL;
  const [usersData, setUsersData] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const ss = Object.keys(usersData);
  return (
    <>
      <div className="" style={{ backgroundColor: "#94ce89" }}>
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
              <p>Start exploring listed businesses >> </p>
            </Col>
            <Col className="m-2"></Col>
          </Row>
        </Container>
      </div>
      <ListPageDetails />
    </>
  );
}

export default LandingPage;
