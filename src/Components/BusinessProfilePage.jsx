// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// Styling
import { Image, Container, Spinner, Row, Col, Button } from "react-bootstrap";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "https://cdn.skypack.dev/react-leaflet@next/index.js";

import userImgPlaceholder from "../assets/placeholder/user.png";
import logoImgPlaceholder from "../assets/placeholder/logo.png";
import bannerImgPlaceholder from "../assets/placeholder/banner.jpg";

import "./ProfilePage/profilepage.css";
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";

import ProductItem from "./ProfilePage/ProductItem";
import ListMap from "./BusinessListPage/ListMap";

const BusinessProfilePage = () => {
  const URL = process.env.REACT_APP_API_URL;
  let params = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const loggedUser = useSelector((s) => s.users.loggedUser);
  const loggedInStatus = useSelector((s) => s.helper.loggedin);

  const userId = params.userId;
  const [isMe, setIsMe] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);
  const [trading, setTrading] = useState(false);
  const user = useSelector((s) => s.users.user);

  useEffect(() => {
    const fetchUserData = async (profileId) => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/business/${profileId}`, {
          withCredentials: true,
        });
        setProfileData(response.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchUserData(userId);
    verifyMe();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${URL}/business/${profileData._id}/products`
      );
      let data = await res.data;
      setProductData(data);
      dispatch({ type: "FETCH_ALL_PRODUCTS", payload: productData });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [profileData._id]);
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
  const verifyMe = () => {
    if (params.userId == "me" && loggedInStatus == false) {
      console.log("its not me");
    } else if (params.userId != "me") {
      console.log("its not me sec");
    }
  };
  const position = [51.505, -0.09];
  const today = new Date();
  const days = today.getDay(); /* 4*/
  const { businessname, username, _id, category } = profileData;
  return (
    <>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {profileData && !loading && (
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
                    <h1 className="text-businessname">{businessname}</h1>
                    <p className="text-category">{category}</p>
                  </Col>
                </Row>
              </Container>
              {/* <About data={profileData} /> */}
              <hr className="" />

              <Row>
                <Button className="btn-shoppinglist float-right">
                  View Pricelist
                </Button>
              </Row>
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

              <hr className="" />
              <h2>Location</h2>
              <ListMap />

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
