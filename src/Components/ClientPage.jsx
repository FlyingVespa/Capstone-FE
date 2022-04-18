//libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// styles
import { Box, Typography, Avatar } from "@mui/material";
import {
  Container,
  Button,
  Col,
  Row,
  Card,
  Image,
  Tabs,
  Tab,
} from "react-bootstrap";

//components
import {
  fetchLoggedUserReq,
  fetchLoggedUserSuccess,
  fetchLoggedUserFailure,
  fetchLoggedInClient,
} from "../redux/users/userAction";
import { FiSettings, FiStar, FiShoppingCart } from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { RiBookmark3Line } from "react-icons/ri";

import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import SavedStores from "./ClientHomePage/SavedStores";
import ShoppingList from "./ClientHomePage/ShoppingList";
import ClientSettings from "./ClientHomePage/ClientSettings";
import "./ClientHomePage/clienthomepage.css";

///////////////////////////////////////////////////////////////////////////////

const ClientPage = () => {
  const [value, setValue] = useState(0);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedin = useSelector((s) => s.helper.loggedin);
  // const currentUser = useSelector((s) => s.user.loggedUser);
  const [show, setShow] = useState(true);
  const [key, setKey] = useState("home");
  const [loggedinUser, setLoggedinUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const URL = process.env.REACT_APP_API_URL;

  const fetchLoggedInClient = async () => {
    if (loggedin === true) {
      dispatch(fetchLoggedUserReq());
      try {
        const response = await axios.get(`${URL}/profile/me`, {
          withCredentials: true,
        });
        let loggedUser = await response.data;
        await dispatch(fetchLoggedUserSuccess(loggedUser));
        setLoggedinUser(loggedUser);

        console.log("fetch logged", loggedUser);
      } catch (error) {
        dispatch(fetchLoggedUserFailure(error.message));
        console.log(error);
      }
    } else {
      alert("Please login before accessing dashboard");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchLoggedInClient();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="page">
      {loggedinUser && (
        <Container className="client-profile">
          <Row className="header">
            <Image src={loggedinUser.avatar} />
            <div>
              <h2>
                {loggedinUser.firstname} {loggedinUser.lastname}
              </h2>
              <p></p>
            </div>
          </Row>
          <Row>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
              <Tab eventKey="home" title="Shopping List">
                <FiShoppingCart />
                <ShoppingList />
              </Tab>
              <Tab eventKey="profile" title={"Favorites"}>
                <RiBookmark3Line />
                <SavedStores />
              </Tab>
              <Tab eventKey="contact" title="Settings">
                <FiSettings />
                <ClientSettings />
              </Tab>
            </Tabs>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ClientPage;
