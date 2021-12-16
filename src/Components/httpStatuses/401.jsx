import "./httpStatuses.css";
// import "./NotLoggedIn.css"
import FourOone from "../../assets/images/403.gif"
import { Image } from "react-bootstrap";

const UnAuthorized = () => {
  return (
    <>
      <div className="image-status-codes">
        <Image id="unauth-image" src={FourOone} />
        <h3>
          Please check with the site admin if you believe this is a mistake.
        </h3>
      </div>
    </>
  );
};
{
  /* <a href="https://storyset.com/user">User illustrations by Storyset</a> */
}
export default UnAuthorized;
