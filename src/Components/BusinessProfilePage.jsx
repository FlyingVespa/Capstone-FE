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
  Badge,
  FormControl,
  Accordian,
} from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

import userImgPlaceholder from "../assets/placeholder/user.png";
import logoImgPlaceholder from "../assets/placeholder/logo.png";
import bannerImgPlaceholder from "../assets/placeholder/banner.jpg";

import "./ProfilePage/profilepage.css";

import Products from "./ProfilePage/Products";
import Map from "./ProfilePage/Map";
import About from "./ProfilePage/About";
import TradingHours from "./ProfilePage/TradingHours";
import Services from "./ProfilePage/Services";
import PageLoad from "./Loaders/PageLoad";

const BusinessProfilePage = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  let params = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const loggedInStatus = useSelector((s) => s.helper.loggedin);
  const user = useSelector((s) => s.users.user);

  const userId = params.userId;
  const [profileData, setProfileData] = useState({});
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${URL}/business/${profileData._id}/products`
      );
      let data = await res.data;
      setProductData(data);
      dispatch({ type: "FETCH_ALL_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (profileId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/business/${profileId}`, {
        withCredentials: true,
      });
      let data = await res.data;
      setProfileData(data);
      dispatch({ type: "CURRENT_USER_DETAILS", payload: data });
      console.log("ProfileData:", data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData(userId);
    console.log(profileData.times);
  }, []);

  useEffect(() => {
    props.setUser(profileData);
  }, [profileData]);

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

  const { businessname, category } = profileData;
  return (
    <>
      {loading && <PageLoad />}

      {profileData !== undefined && !loading && (
        <>
          <Container className="profile page">
            <Row className="my-4 header">
              <Col xs={3} md={2} lg={1}>
                <Image src={logoImg} id="img-logo" />
              </Col>
              <Col xs={9} md={10} lg={11}>
                <h2 className="text-businessname">{businessname}</h2>
                <span className="text-category">{category}</span>
                <Badge className="mx-2">Open</Badge>
              </Col>
            </Row>
            <hr />
            <Container>
              <Row className="my-2">
                {profileData && (
                  <About data={profileData} contact={profileData.contact} />
                )}
                <TradingHours data={profileData.times} date={profileData} />
              </Row>
            </Container>

            <Services services={profileData.services} />

            {productData && productData.length > 0 && (
              <Products data={productData} profileData={profileData} />
            )}
            <hr />
            <Map address={profileData.address} data={profileData} />
            <hr />
          </Container>
        </>
      )}
    </>
  );
};
export default BusinessProfilePage;
