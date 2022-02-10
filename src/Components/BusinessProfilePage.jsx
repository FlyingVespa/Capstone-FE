// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// Styling
import {
  Image,
  Container,
  Spinner,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

import userImgPlaceholder from "../assets/placeholder/user.png";
import logoImgPlaceholder from "../assets/placeholder/logo.png";
import bannerImgPlaceholder from "../assets/placeholder/banner.jpg";

import "./ProfilePage/profilepage.css";

import ProductItem from "./ProfilePage/ProductItem";
import Map from "./ProfilePage/Map";
import About from "./ProfilePage/About";
import UserMap from "./ProfilePage/UserMap";
import TradingHours from "./ProfilePage/TradingHours";

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
        console.log("ProfileData:", response.data);
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
            <Row>
              <Col md={9} className="container-1">
                <Container className="">
                  <Row>
                    <Col>
                      <Container className="">
                        <Row>
                          <Col>
                            <Image src={logoImg} id="img-logo" />
                          </Col>
                          <Col xs={10}>
                            <h1 className="text-businessname">
                              {businessname}
                            </h1>
                            <p className="text-category">{category}</p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <About data={profileData} />
                    </Col>
                    <Col>
                      <TradingHours data={profileData} />
                    </Col>
                  </Row>
                  <Row>
                    <Container>
                      <Map location={profileData.location} data={profileData} />
                    </Container>
                  </Row>
                </Container>
              </Col>

              <Col md={3} className="container-2 stoclist">
                <Container>
                  <Row className="product-container">
                    {/* PRODUCT LIST */}
                    <h2 className="text-center">Product List</h2>
                    <FormControl
                      type="text"
                      placeholder="Search products"
                      className=""
                    />
                    {productData &&
                      productData.map((item, i) =>
                        loading ? (
                          <Skeleton variant="text" />
                        ) : (
                          <ProductItem item={item} key={i} />
                        )
                      )}
                  </Row>
                </Container>
              </Col>
            </Row>

            {/* <About data={profileData} /> */}
            <hr className="" />

            <Row>
              <Button className="btn-shoppinglist float-right">
                View Pricelist
              </Button>
            </Row>

            <hr className="" />
            <div className="my-5">
              {/* <Button className="distance">Calculate Distance</Button> */}
            </div>
            <hr className="" />
            {/* <UserMap /> */}
            <h2>Location</h2>

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

            <Container></Container>
          </div>
        </>
      )}
    </>
  );
};
export default BusinessProfilePage;
