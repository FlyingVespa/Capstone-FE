import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { Button, Avatar } from "@mui/material";

import logo from "../shop.png";

function NavBar() {
  const loggedin = useSelector((s) => s.users.loggedin);
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
            <Nav.Link href="/register">regsiter</Nav.Link>
          </Nav>

          <Nav>
            {!loggedin ? (
              <>
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
              </>
            ) : (
              <Button 
                to="/logout"
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
  );
}

export default NavBar;
