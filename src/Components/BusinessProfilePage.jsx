// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// Styling
import { Image, Container, Spinner, Row, Col, Button } from "react-bootstrap";
import fishshop from "../assets/images/fishshop.jpg";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";

// Components
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";
import Promotions from "./ProfilePage/Promotions";
import StockList from "./ProfilePage/StockList";
// import { getBusinessUser } from "../network/lib/businessUsers";

import { getBusinessUser } from "../network/lib/businessUsers";

const BusinessProfilePage = () => {
  const URL = process.env.REACT_APP_API_URL;
  let params = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  const loggedUser = useSelector((s) => s.users.loggedUser);
  const userId = loggedUser._id;
  const currentUserId = params.userId;
  const [isMe, setIsMe] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});
  const [profileData, setProfileData] = useState({});
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    getBusinessUser("me", setProfileData);
    dispatch({ type: "SET_CURRENT_USER", payload: profileData });
  }, []);

  return (
    <div>
      <Button onClick={() => history.push("/business/me/dashboard")}>
        Dashboards
      </Button>

      {profileData && (
        <>
          <Container className="profile_page">
            <Image src={profileData.img_logo || fishshop} id="banner" />
          </Container>
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
                    {profileData.businessname}
                    <IoIosStarOutline className="icon star" />
                  </h1>
                  <span>{profileData.category}</span>
                  <IoMdAlarm />
                  <span> open</span>
                  <Button href="#location">Locate us</Button>
                </Col>
              </Row>
            </Container>
            {/* <Button onClick={product}>Get products</Button> */}

            <About about={profileData.bio} />
            <hr className="" />

            <Button>Create Shopping List</Button>
            <hr className="" id="location" />
            {profileData.username}
            <Image className="profile-map" />
          </Container>
        </>
      )}
    </div>
  );
};
export default BusinessProfilePage;
