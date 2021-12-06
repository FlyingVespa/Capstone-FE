import React, { useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Avatar, Chip } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";

const NavBar = ({ URL }) => {
  const dispatch = useDispatch();
  const loggedin = useSelector((s) => s.helper.loggedin);
  const currentUser = useSelector((s) => s.users.user);
  const avatar = currentUser
    ? currentUser.img_logo
    : "https://source.unsplash.com/user/erondu";

  let history = useHistory();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const logoutUser = () => {
    axios
      .get("http://localhost:4545/auth/logout", { withCredentials: true })
      .then((response) => JSON.stringify(response))
      .then(dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false }))
      .then(history.push("/"))
      .catch((error) => console.log("error", error));
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
            <Nav.Link href="business/me">Business Me</Nav.Link>
            <Nav className="me-auto" />
            <Nav>
              {!loggedin ? (
                <>
                  <Button
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleShow}
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
              ) : !currentUser ? (
                <div className="d-flex justify-content-center mt-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <>
                  <Chip
                    label={currentUser.username}
                    variant="outlined"
                    avatar={<Avatar alt="Remy Sharp" src={avatar} />}
                  />
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
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default NavBar;
