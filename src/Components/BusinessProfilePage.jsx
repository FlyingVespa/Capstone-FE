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

  useEffect(() => {
    const fetchThings = async () => {
      await getBusinessUser("me", setProfileData, setLoading);
      await dispatch({ type: "CURRENT_USER_DETAILS", payload: profileData });
    };
    fetchThings();
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

  let operatingHours = profileData.times
    ? Object.keys(profileData.times)
    : null;
  const today = new Date();
  let days = today.getDay();

  // var date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // var time =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //   const checkOpen = (day, currenttime) => {
  // if (day == "close") {
  //   setTrading(false)
  // } else if (day == "trading" &&  currenttime  > profileData.times[day].open && currenttime < profileData.times[day].closed){
  //     setTrading(true)
  //   }

  // }

  // }

  // var dateTime = day + " " + time;

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
                  </Col>
                  <Col>
                    <h1 className="text-businessname">
                      {profileData.businessname}
                    </h1>
                    <p className="text-category">{profileData.category}</p>
                    <p>{days}</p>
                    {/* <p>{profileData?.times[day].open}</p> */}
                    {/* <p id="demo"></p> */}
                    {operatingHours?.map((day) =>
                      profileData?.times[day].trading !== true ? (
                        <Col>
                          <p>Closed</p>
                        </Col>
                      ) : (
                        <>
                          <Col md={4}>
                            <p id="times-open">{profileData.times[day].open}</p>
                          </Col>
                          <Col md={4}>
                            <p id="times-closed">
                              {profileData.times[day].closed}
                            </p>
                          </Col>
                        </>
                      )
                    )}
                    {/* <IoMdAlarm /> */}
                    {/* <span> open</span> */}
                    {/* <GrMapLocation id="icon-location" /> */}
                  </Col>
                </Row>
              </Container>

              <About about={profileData.bio} data={profileData} />
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
