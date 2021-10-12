import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Jumbotron,
  Image,
  Container,
  Spinner,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import fishshop from "../fishshop.jpg";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";
import Promotions from "./ProfilePage/Promotions";
import StockList from "./ProfilePage/StockList";
import Map from "./ProfilePage/Map";
// import {REACT_APP_API_URL, REACT_APP_MONGO_DB} from "../env"
// import { getUserData } from "./crud.js";

const ProfilePage = (props) => {
  const select = useSelector((s) => s.selected);
  const userId = props.match.params.userId;
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState([]);

  const URL = process.env.REACT_APP_API_URL;

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/business/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        await setUserData(userData);
        setLoading(false);

        console.log(userData);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {userData && loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Jumbotron>
            <Image src={userData?.info.img_logo} id="banner" />
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
                    {userData.basic.name}{" "}
                    <IoIosStarOutline className="icon star" />
                  </h1>
                  <span>
                    {userData.basic.category} in {userData.location.city},
                    {userData.location.country}
                  </span>
                  <IoMdAlarm />
                  <span> open</span>
                  <Button href="#location">Locate us</Button>
                </Col>
              </Row>
            </Container>
            <About about={userData.info.bio} />
            <hr className="" />
            <Services services={userData.info.services} />
            <hr className="" />
            <Promotions promo={userData} />
            <hr className="" />
            <Featured promo={userData.info} />
            <hr className="" />
            <StockList promo={userData.info} />
            <Button>Create Shopping List</Button>
            <hr className="" id="location" />
            <Map id="location" alt="map" loc={userData.location} />
          </Container>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
