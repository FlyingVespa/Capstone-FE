import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { animated, useTransition } from "react-spring";
import { Button, Avatar } from "@mui/material";
// import { useState } from "react";
import logo from "../shop.png";

function NavBar() {
  const select = useSelector((s) => s.selected);

  // 6164515b5ab82a5ed833de3a
  return (
    <Navbar className="navbar-top" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: "700" }}>
          <Avatar className="navbar_icon" src={logo} />
          BuyLocal.online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/business/${select}`}>Technologies Used</Nav.Link>
            <Nav.Link href="/register">regsiter</Nav.Link>
          </Nav>

          {}
          <Nav>
            <Button
              className="mx-2"
              variant="contained"
              color="success"
              variant="outlined"
              size="medium"
              href="/login"
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
