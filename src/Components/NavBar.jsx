import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Navbar, Nav, Row, Col, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";
import DropDownSettings from "./Navigation/DropDownSettings";
import StandardNav from "./Navigation/StandardNav";
import SelectRegisterModal from "./LoginAndRegister/SelectRegisterModal";

let initialState = { email: "test@business.com", password: "1234" };

const NavBar = ({ URL, user }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const helper = useSelector((s) => s.helper);
  const [loginDetails, setLoginDetails] = useState(initialState);

  const logoutUser = () => {
    try {
      axios
        .get(`${URL}/auth/logout`, { withCredentials: true })
        .then(
          dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false }) &&
            navigate("/")
        );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLoginModal = () => {
    dispatch({ type: "SET_LOGIN_MODAL", payload: !helper.loginModal });
  };
  const handleRegisterModal = () => {
    dispatch({ type: "SET_REGISTER_MODAL", payload: !helper.registerModal });
  };
  const handleChange = ({ target }) => {
    setLoginDetails({ ...loginDetails, [target.name]: target.value });
  };

  const loginUser = async () => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginDetails,
        {
          withCredentials: true,
        }
      );
      let data = resp.data;

      await dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
      if (resp.data.role === "client") {
        await dispatch({
          type: "SET_LOGIN_MODAL",
          payload: !helper.loginModal,
        });

        await dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
        console.log("role", data.role);
        navigate("/profile/me");
      } else if (resp.data.role === "user") {
        await dispatch({
          type: "SET_LOGIN_MODAL",
          payload: !helper.loginModal,
        });
        await dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
        console.log("role", data.role);
        navigate("/business/me");
      } else {
        console.log("no role has been assigned to account");
        console.log("role", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let windowWidth = window.innerWidth;

  return (
    <>
      <Navbar className="navbar-top" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Avatar id="avatar" src={logo} />
            BuyLocal.online
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <Nav.Link
                href="/autocomplete"
                className="mx-2"
                variant="contained"
                color="success"
                size="medium"
              >
                GoogleMaps
              </Nav.Link>
              {helper.loggedin ? (
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
              ) : (
                <>
                  <Nav.Link
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleLoginModal}
                    exact
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link onClick={handleRegisterModal}>
                    Register Free
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal
        open={helper.productModal}
        handleClose={handleLoginModal}
        loginDetails={loginDetails}
        handleChange={handleChange}
        loginUser={loginUser}
      />
      <SelectRegisterModal
        show={helper.registerModal}
        handleClose={handleRegisterModal}
      />
    </>
  );
};

export default NavBar;
