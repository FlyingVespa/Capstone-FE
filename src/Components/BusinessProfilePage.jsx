// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// Styling
import { Image, Container, Spinner, Row, Col, Button } from "react-bootstrap";
import fishshop from "../assets/images/fishshop.jpg";
import { IoIosStarOutline, IoMdAlarm } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

// Components
import Logo from "./ProfilePage/logo";
import About from "./ProfilePage/About";
import Services from "./ProfilePage/Services";
import Featured from "./ProfilePage/Featured";
import Promotions from "./ProfilePage/Promotions";
import StockList from "./ProfilePage/StockList";
import ProductItem from "./ProfilePage/ProductItem";
// import { getBusinessUser } from "../network/lib/businessUsers";

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
        </>
      )}
    </div>
  );
};
export default BusinessProfilePage;
