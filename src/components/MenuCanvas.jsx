// library
import React from "react";
import { Link } from "react-router-dom";

// styling
import { Offcanvas, Button, Nav } from "react-bootstrap";
// components

function MenuCanvas({ show, handleClose }) {
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
      Launch
    </Button> */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        backdrop={true}
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Link to="/settings">Settings</Link>
            </Nav.Item>

            <Nav.Item>
              <Link to="/business/me/dashboard" eventKey="link-1">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuCanvas;
