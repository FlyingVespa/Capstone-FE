// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// Styling
import { Image, Container, Row, Col, Badge } from "react-bootstrap";

import "./BusinessPage/businessPage.css";

import ProductsSection from "./BusinessPage/ProductsSection";
import MapSection from "./BusinessPage/MapSection";
import AboutSection from "./BusinessPage/AboutSection";
import TradingHoursSection from "./BusinessPage/TradingHoursSection";
import ServicesSection from "./BusinessPage/ServicesSection";
import PageLoad from "./Loaders/PageLoad";
import HeaderSection from "./BusinessPage/HeaderSection";
import LoaderSpinner from "./Loaders/LoaderSpinner";

const BusinessPage = (props) => {
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

  const fetchUserData = async (profileId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/business/${profileId}`, {
        withCredentials: true,
      });
      let data = await res.data;
      await setProfileData(res.data);
      dispatch({ type: "CURRENT_USER_DETAILS", payload: data });
      console.log("ProfileData:", data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      navigate("/page_error/404");
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${URL}/business/${profileData._id}/products`
      );
      let data = await res.data;
      await setProductData(res.data);
      console.log("products", res.data);

      dispatch({ type: "FETCH_ALL_PRODUCTS", payload: data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [profileData]);

  return (
    <>
      {loading && <PageLoad />}

      {profileData !== undefined && !loading && (
        <>
          <HeaderSection data={profileData} />
          <Container className="profile page">
            {profileData && (
              <>
                <Container>
                  <Row>
                    <AboutSection data={profileData} />
                    <TradingHoursSection
                      data={profileData.tradingtimes}
                      date={profileData}
                    />
                  </Row>
                </Container>
                <ServicesSection data={profileData} />
                {productData && (
                  <ProductsSection
                    data={productData}
                    profileData={profileData}
                  />
                )}
              </>
            )}
            <hr />
            {profileData.address && <MapSection data={profileData} />}
            <hr />
          </Container>
        </>
      )}
    </>
  );
};
export default BusinessPage;
