import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Avatar, Chip } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";
let initialState = { email: "test@business.com", password: "1234" };

const NavBar = ({ URL }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const helper = useSelector((s) => s.helper);
  const currentUser = useSelector((s) => s.users.user);

  const [loginDetails, setLoginDetails] = useState(initialState);

  const logoutUser = () => {
    axios
      .get(`${URL}/auth/logout`, { withCredentials: true })
      .then((response) => JSON.stringify(response.data))
      .then(dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false }))
      .then(history.push("/"))
      .catch((error) => console.log("error", error));
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
      let data = await JSON.stringify(resp.data);
      await dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
      if (data.includes("client")) {
        await history.push("profile/me");
        dispatch({ type: "SET_LOGIN_MODAL", payload: !helper.loginModal });
        dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
      } else if (data.includes("user")) {
        history.push("/business/me/dashboard");
        dispatch({ type: "SET_LOGIN_MODAL", payload: !helper.loginModal });
        dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
      } else {
        console.log("no role has been assigned to account");
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
            <Button onClick={() => history.push("business/me")}>
              Business Me
            </Button>
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
