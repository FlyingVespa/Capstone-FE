// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Turn as Hamburger } from "hamburger-react";
import axios from "axios";
// Styling
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  NavbarBrand,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
// Componets
import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";
import DropDownSettings from "./Navigation/DropDownSettings";
import StandardNav from "./Navigation/StandardNav";
import SelectRegisterModal from "./LoginAndRegister/SelectRegisterModal";
import MenuCanvas from "./MenuCanvas";

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
  const user = useSelector((s) => s.users.loggedUser);

  const handleLoginModal = () => {
    dispatch({ type: "SET_LOGIN_MODAL", payload: !helper.loginModal });
  };
  const handleRegisterModal = () => {
    dispatch({ type: "SET_REGISTER_MODAL", payload: !helper.registerModal });
    navigate("/register");
  };

  useEffect(() => {}, [handleLoginModal]);
  return (
    <>
      <Navbar className="navbar-top" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image
              id="avatar"
              src={logo}
              style={{ height: "2.5rem", border: "green 2px solid" }}
            />
          </Navbar.Brand>
          <Navbar.Brand id="navbar-title">
            <span>buylocal</span>
            <span>.online</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <MenuCanvas show={showOffCanvasMenu} handleClose={handleClose} />
              {/* {helper.loggedin ? (
                <>
                  {windowWidth < 992 ? (
                    <StandardNav logoutUser={logoutUser} currentUser={user} />
                  ) : (
                    <>
                      <Avatar src={user.img_user} className="mx-3" />
                      <DropDownSettings
                        logoutUser={logoutUser}
                        currentUser={user}
                      />
                    </>
                  )}
                </>
              ) : ( */}
            </Nav>
          </Navbar.Collapse>
          <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
              <span></span>
            </label>

            <ul className="menu__box">
              {loggedin === true ? (
                <>
                  <li>
                    <Nav.Link
                      className="menu__item"
                      variant="contained"
                      color="success"
                      size="medium"
                      onClick={handleLoginModal}
                    >
                      Login
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link
                      onClick={() => navigate("/register")}
                      className="menu__item"
                    >
                      Register Free
                    </Nav.Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <Nav.Link
                    onClick={() => navigate("/register")}
                    className="menu__item"
                  >
                    Register Free
                  </Nav.Link>
                </>
              )}
              <li>
                <a class="menu__item" href="#">
                  Contact
                </a>
              </li>
              <li>
                <a class="menu__item" href="#">
                  Twitter
                </a>
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
