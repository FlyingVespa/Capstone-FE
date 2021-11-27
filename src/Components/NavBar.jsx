import React, { useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Avatar, Chip } from "@mui/material";

import logo from "../assets/logo/shop.png";
import LoginModal from "./LoginAndRegister/LoginModal";

const NavBar = ({ URL }) => {
  const loggedin = useSelector((s) => s.helper.loggedin);
  const loggedinUser = useSelector((s) => s.users.user);
  const avatar = loggedinUser
    ? loggedinUser.img_logo
    : "https://source.unsplash.com/user/erondu";

  let history = useHistory();
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
                <>
                  <Chip
                    variant="outlined"
                    avatar={<Avatar alt="Remy Sharp" src={avatar} />}
                  />

                  <Button
                    className="mx-2"
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={() =>
                      axios.get(`${URL}/auth/logout`).then(history.push("/"))
                    }
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
