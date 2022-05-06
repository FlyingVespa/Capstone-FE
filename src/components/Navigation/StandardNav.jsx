import React from "react";
import { Nav, Col } from "react-bootstrap";
import { FiPower, FiHome, FiTool, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";

function StandardNav({ logoutUser }) {
  let navigate = useNavigate();
  return (
    <>
      <Col style={{ width: "100%" }}>
        <Nav.Link
          onClick={() => {
            navigate("/business/me");
          }}
        >
          <FiUser className="mx-2" id="navbar-icon" />
          Profile
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            navigate("/business/me/dashboard");
          }}
        >
          <FiTool className="mx-2" id="navbar-icon" />
          Settings
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            navigate("/business/me/dashboard");
          }}
        >
          <FiHome className="mx-2" id="navbar-icon" />
          Dashboard
        </Nav.Link>
        <hr className="p-0 m-0" fluid />
        <Nav.Link onClick={logoutUser}>
          <FiPower className="mx-2" id="navbar-icon" />
          <strong>Logout</strong>
        </Nav.Link>
      </Col>
    </>
  );
}

export default StandardNav;
