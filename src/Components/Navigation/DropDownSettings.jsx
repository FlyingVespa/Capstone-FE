import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FiPower, FiHome, FiTool, FiUser } from "react-icons/fi";

function DropDownSettings({ logoutUser, currentUser }) {
  const navigate = useNavigate();

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {currentUser.email}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              navigate("/business/me");
            }}
          >
            <FiUser className="mx-2" id="navbar-icon" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              navigate("/business/me/dashboard");
            }}
          >
            <FiTool className="mx-2" id="navbar-icon" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              navigate("/business/me/dashboard");
            }}
          >
            <FiHome className="mx-2" id="navbar-icon" />
            Dashboard
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutUser}>
            <FiPower className="mx-2" id="navbar-icon" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropDownSettings;
