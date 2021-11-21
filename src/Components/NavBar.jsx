import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Button, Avatar } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";

const NavBar = () => {
  // let history = useHistory();

  const loggedin = useSelector((s) => s.users.loggedin);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
            <Nav className="me-auto"></Nav>
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
              ) : (
                <Button
                  href="/logout"
                  className="mx-2"
                  variant="contained"
                  color="success"
                  size="medium"
                >
                  Logout
                </Button>
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
