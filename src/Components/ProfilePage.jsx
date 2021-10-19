import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
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
// import Map from "./ProfilePage/Map";

import MapImg from "../map.jpg";
// import {REACT_APP_API_URL, REACT_APP_MONGO_DB} from "../env"
// import { getUserData } from "./crud.js";

const ProfilePage = (props) => {
  // const select = useSelector((s) => s.selected);
  const userId = props.match.params.userId;
  const [loading, setLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});
  // const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState({
    contact: {
      email: "",
      tel: "",
      cell: "",
      insta: "",
      whatsapp: "",
      twitter: "",
    },
    basic: {
      name: "",
      category: "",
      email: "",
      shipping: false,
      services: [],
      username: "",
    },
    times: {
      monday: { trading: true, open: "09:00", closed: "17:00" },
      tuesday: { trading: true, open: "09:00", closed: "17:00" },
      wednesday: { trading: true, open: "09:00", closed: "17:00" },
      thursday: { trading: true, open: "09:00", closed: "17:00" },
      friday: { trading: true, open: "09:00", closed: "17:00" },
      saturday: { trading: true, open: "09:00", closed: "17:00" },
      sunday: { trading: true, open: "09:00", closed: "17:00" },
      public: { trading: true, open: "09:00", closed: "17:00" },
    },
    info: {
      services: [],
      bio: null,
      img_logo: null,
      img_user: null,
      img_banner: null,
    },
    location: {
      country: null,
      region: null,
      city: null,
      zip: null,
      street: null,
      street_numbebr: null,
    },
  });

  const URL = process.env.REACT_APP_API_URL;

  const getUserData = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${URL}/business/me`, {
        method: "GET",
        headers: {
          // get localstorage bearer and send in headers
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const userData = await response.json();
        await setUserData(userData);
        setLoading(false);

        console.log(userData);
        props.routerProps.history.push("/business/login");
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const LogoutUser = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${URL}/business/logout`, {
        method: "POST",
        headers: {
          // get localstorage bearer and send in headers
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
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
          <Jumbotron className="profile_page">
            <Image src={userData.info.img_logo || fishshop} id="banner" />
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
            <Button onClick={LogoutUser}> logout</Button>
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
            <Image className="profile-map" src={MapImg} />
          </Container>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
