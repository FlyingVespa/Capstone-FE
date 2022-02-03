// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// Styling
import { Image, Container, Badge, Row, Col, Button } from "react-bootstrap";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

import userImgPlaceholder from "../assets/placeholder/user.png";
import logoImgPlaceholder from "../assets/placeholder/logo.png";
import bannerImgPlaceholder from "../assets/placeholder/banner.jpg";

// Components
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";
import Promotions from "./ProfilePage/Promotions";
import StockList from "./ProfilePage/StockList";
import ProductItem from "./ProfilePage/ProductItem";

import { GrMapLocation } from "react-icons/gr";

import { getBusinessUser } from "../network/lib/businessUsers";
import { getProductData, getUserProducts } from "../network/lib/products";

const BusinessProfilePage = () => {
  const URL = process.env.REACT_APP_API_URL;
  let params = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  const loggedUser = useSelector((s) => s.users.loggedUser);
  const userId = loggedUser._id;
  const currentUserId = params.userId;
  const [isMe, setIsMe] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);
  const [trading, setTrading] = useState(false);
  const user = useSelector((s) => s.users.user);
  const getBusinessUser = (userId) => {
    try {
      axios
        .get(`${URL}/business/${userId}`, { withCredentials: true })
        .then((result) => {
          const userData = result.data;
          setProfileData(userData);
          dispatch({ type: "CURRENT_USER_DETAILS", payload: userData });
        });
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getBusinessUser(currentUserId);
    console.log("userID", currentUserId);
    console.log("TIMES", user.times);
    console.log("TIMESaaa", user.times.monday);
    console.log("[TIMESaaa]", user.times["monday"]);
    // console.log("[T]", profileData?.times["monday"]);
  }, []);

  useEffect(() => {
    const fetchMoreThings = () => {
      getUserProducts(profileData._id, setProductData);
      dispatch({ type: "FETCH_ALL_PRODUCTS", payload: productData });
    };
    fetchMoreThings();
    // fetchDay();
  }, []);

  let bannerImg = profileData.img_banner
    ? profileData.img_banner
    : bannerImgPlaceholder;
  let logoImg = profileData.img_logo
    ? profileData.img_logo
    : logoImgPlaceholder;
  let userImg = profileData.img_user
    ? profileData.img_user
    : userImgPlaceholder;

  // let operatingHours = Object.keys(profileData?.times);
  let weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date();
  const days = today.getDay(); /* 4*/
  let s = weekdays[days];
  // { weekdays[days] === 5555555 }
  // const keyValue = [
  //   0:{sunday},
  //  1:  monday,
  //   2: "tuesday",
  //   3: "wednesday",
  //   4: "thursday",
  //   5: "friday",
  //   6: "saturday",
  // ]
  // const keyValues = []
  //   sunday: 0,
  //   monday: 1,
  //   tuesday: 2,
  //   wednesday: 3,
  //   thursday: 4,
  //   friday: 5,
  //   saturday: 6,
  //   public: 7,
  // };
  // let parsing = JSON.parse(keyValue);
  // const ss = keyValue[days];
  // let aa = Object.keys(weekdays[days]);
  const printthis = (day) => {
    console.log(profileData.times);
  };
  return (
    <>
      {/* <Button onClick={() => history.push("/business/me/dashboard")}>
        Dashboards
      </Button> */}

      {profileData && (
        <>
          <div className="profile page">
            <Image src={bannerImg} id="img-banner" />

            <Container className="main mb-5">
              <Container className="header mb-5 p-5">
                <Row className="">
                  <Col xs={2}>
                    <Image src={logoImg} id="img-logo" />
                    {/* <p>{s}</p> */}
                    {/* <p>{blue}</p> */}
                    {/* <p>{currentlyOpen}</p> */}
                  </Col>
                  <Col>
                    <h1 className="text-businessname">
                      {profileData.businessname}
                    </h1>
                    <p className="text-category">{profileData.category}</p>
                    {/* {== true ? (
                      <p>open</p>
                    ) : (
                      <p>closed</p>
                    )} */}
                    {/* <p>{days}</p>
                    {operatingHours.map((day) =>
                      profileData?.times[day].trading === true &&
                      days == day + 1 ? (
                        <p>yes</p>
                      ) : (
                        <p>no</p>
                      )
                    )} */}
                    {/* <p>{profileData?.times[4].trading}</p> */}
                    {/* <p id="demo"></p> */}

                    {/* <IoMdAlarm /> */}
                    {/* <span> open</span> */}
                    {/* <GrMapLocation id="icon-location" /> */}
                  </Col>
                </Row>
              </Container>

              <About about={profileData.bio} />
              <hr className="" />

              <Button>Create Shopping List</Button>
              <hr className="" id="location" />
              <Row className="product-container">
                {productData &&
                  productData.map((item, i) =>
                    loading ? (
                      <Skeleton variant="text" />
                    ) : (
                      <ProductItem item={item} key={i} />
                    )
                  )}
              </Row>
              {/* 
            {productData &&
              productData.map((item, i) => <p key={i}>{item.product}</p>)} */}
              <hr className="" />
              {profileData.username}
              {profileData._id}
              <Image className="profile-map" />

              {loading && (
                <Backdrop
                  sx={{
                    color: "black",
                    zIndex: (theme) => theme.zIndex.drawer + 9,
                  }}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </Container>
          </div>
        </>
      )}
    </>
  );
};
export default BusinessProfilePage;
