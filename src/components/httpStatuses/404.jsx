import React from "react";
import "./httpStatuses.css";
import { useNavigate } from "react-router";
import FourOFour from "../../assets/images/404.png";
import { Image, Button } from "react-bootstrap";

function NotFound() {
  let navigate = useNavigate();
  return (
    <div className="image-status-codes">
      <Image id="unauth-image" src={FourOFour} />
      <h3>The Current page you looking for does not exist.</h3>
      <Button onClick={() => navigate("/business")}>Return To Home</Button>
    </div>
  );
}

export default NotFound;
