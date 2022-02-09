import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {  } from "react-router";
import { Button, Avatar } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";
let initialState = { email: "test@business.com", password: "1234" };

const NavBar = ({ URL }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const helper = useSelector((s) => s.helper);
  const currentUser = useSelector((s) => s.users.user);

  const [loginDetails, setLoginDetails] = useState(initialState);

  const isis = useSelector((s) => s.helper.loggedin);

  const logoutUser = () => {
    try {
      axios
        .get(`${URL}/auth/logout`, { withCredentials: true })
        .then.then(
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

  return (
    <>
      <Navbar className="navbar-top" expand="lg">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "700" }}>
            <Avatar className="navbar_icon" src={logo} />
            BuyLocal.online
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Button onClick={() => navigate("business/me")}>Business Me</Button>
            <Nav className="me-auto" />
            <Nav>
              {helper.loggedin ? (
                // currentUser && (
                <>
                  {/* <Chip
                    label={currentUser.username}
                    variant="outlined"
                    // avatar={<Avatar alt="Remy Sharp" src={avatar} />}
                  /> */}

                  {/* <p>{currentUser.username}</p> */}
                  <Button
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={logoutUser}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleLoginModal}
                    exact
                  >
                    Login
                  </Button>
                  <Button
                    href="/register"
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                  >
                    Sign Up Free
                  </Button>
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
    </>
  );
};

export default NavBar;
