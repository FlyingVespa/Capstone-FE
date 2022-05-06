import React from "react";
import "./httpStatuses.css";
// import "./NotLoggedIn.css"
import FourOthree from "../../assets/images/403.gif";
import { Image } from "react-bootstrap";
function Forbidden() {
  return (
    <div className="image-status-codes">
      <Image id="unauth-image" src={FourOthree} />
      <h3>
        Please check with the site admin if you believe this is a mistake.
      </h3>
    </div>
  );
}

export default Forbidden;
