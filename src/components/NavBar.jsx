// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
// Styling
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Badge,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
// Componets
import { FiSettings, FiUser } from "react-icons/fi";
import {
  AiOutlineShop,
  AiOutlinePoweroff,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";
import DropDownSettings from "./Navigation/DropDownSettings";
import StandardNav from "./Navigation/StandardNav";
import SelectRegisterModal from "./LoginAndRegister/SelectRegisterModal";
import MenuCanvas from "./MenuCanvas";

import { logoutUser } from "../utils/utils.js";

let initialState = { email: "test@business.com", password: "1234" };
let windowLocation = window.location.href;

const NavBar = ({ URL }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const helper = useSelector((s) => s.helper);
  const [loginDetails, setLoginDetails] = useState(initialState);
  const [isOpen, setOpen] = useState(false);

  const [showOffCanvasMenu, setShowOffCanvasMenu] = useState(false);

  const handleClose = () => setShowOffCanvasMenu(false);
  const handleShow = () => setShowOffCanvasMenu(true);

  const loggedin = useSelector((s) => s.helper.loggedin);
  const user = useSelector((s) => s.users.user);

  const handleLoginModal = () => {
    dispatch({ type: "SET_LOGIN_MODAL", payload: !helper.loginModal });
  };
  const handleRegisterModal = () => {
    dispatch({ type: "SET_REGISTER_MODAL", payload: !helper.registerModal });
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      console.log("user", user.username);
    }
  }, [handleLoginModal]);

  const handelNavigate = async (params) => {
    let menuToggle = document.getElementById("menu_toggle");
    await setTimeout(() => (menuToggle.checked = false), 400);
    await navigate(params);
  };

  const handleLogout = () => {
    logoutUser().then(() => {
      console.log("logout then");
      dispatch({ type: "USER_LOGGED_OUT" });
      dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false });
      navigate("/");
    });
  };

  return (
    <>
      <Navbar className="navbar-top" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image
              id="avatar"
              src={logo}
              style={{ height: "2.5rem", padding: "5px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <span>buylocal</span>
                <span>.online</span>
              </Nav.Link>
            </Nav>
            {loggedin !== true ? (
              <Nav>
                <Button variant="light">Register</Button>
                <Button variant="success">Login</Button>
              </Nav>
            ) : (
              <></>
            )}
          </Navbar.Collapse>

          <div class="hamburger-menu">
            <input id="menu_toggle" type="checkbox" />
            <label class="menu_btn" for="menu_toggle">
              <span></span>
            </label>

            <ul className="menu_box">
              {loggedin === true ? (
                <>
                  <Row className="menu_profile_box">
                    <Col md={4}>
                      <Image src={user.img_logo} />
                    </Col>
                    <Col>
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                      <Badge onClick={handleLogout} bg="secondary">
                        <AiOutlinePoweroff id="menu_item_icon" />
                        <span>Sign Out</span>
                      </Badge>
                    </Col>
                  </Row>

                  <hr />
                </>
              ) : (
                <>
                  <li>
                    <Nav.Link className="menu_item" onClick={handleLoginModal}>
                      Login
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link
                      onClick={() => handelNavigate("/register")}
                      className="menu_item"
                    >
                      Register Free
                    </Nav.Link>
                  </li>
                </>
              )}
              <li onClick={() => handelNavigate("/business/me")}>
                <Nav.Link className="menu_item">
                  <FiUser id="menu_item_icon" />
                  My Profile
                </Nav.Link>
              </li>
              <li onClick={() => handelNavigate("/business")}>
                <Nav.Link className="menu_item">
                  <AiOutlineShop id="menu_item_icon" />
                  Browse Businesses
                </Nav.Link>
              </li>

              <li onClick={() => handelNavigate("business/me/dashboard")}>
                <Nav.Link className="menu_item" href="#">
                  <FiSettings id="menu_item_icon" />
                  Settings
                </Nav.Link>
              </li>
              <li id="creator_stamp">
                <span>created by Hedri Nel</span>
                <br />
                <span> First demo project 2022</span>
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>
      <LoginModal open={helper.productModal} handleClose={handleLoginModal} />
      <SelectRegisterModal
        show={helper.registerModal}
        handleClose={handleRegisterModal}
      />
    </>
  );
};

export default NavBar;
