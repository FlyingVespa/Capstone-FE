//libraries
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// styles
import { Tabs, Tab, Box, Typography, Avatar } from "@mui/material";
import { Container, Button, Col, Row, Card, Image } from "react-bootstrap";

//components
import {
  fetchLoggedUserReq,
  fetchLoggedUserSuccess,
  fetchLoggedUserFailure,
  fetchLoggedInClient,
} from "../redux/users/userAction";

import SidebarMenu from "./ClientHomePage/SidebarMenu";
import "./ClientHomePage/clienthomepage.css";

///////////////////////////////////////////////////////////////////////////////

const ClientDashboard = () => {
  const [value, setValue] = useState(0);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedin = useSelector((s) => s.helper.loggedin);
  // const currentUser = useSelector((s) => s.user.loggedUser);
  const [show, setShow] = useState(true);
  const [loggedinUser, setLoggedinUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const URL = process.env.REACT_APP_API_URL;

  const fetchLoggedInClient = async () => {
    if (loggedin === true) {
      dispatch(fetchLoggedUserReq());
      try {
        const response = await axios.get(`${URL}/profile/me`, {
          withCredentials: true,
        });
        let loggedUser = await response.data;
        await dispatch(fetchLoggedUserSuccess(loggedUser));
        setLoggedinUser(loggedUser);

        console.log("fetch logged", loggedUser);
      } catch (error) {
        dispatch(fetchLoggedUserFailure(error.message));
        console.log(error);
      }
    } else {
      alert("Please login before accessing dashboard");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchLoggedInClient();
  }, []);

  return (
    <div>
      {loggedinUser && (
        <Container className="client-profile">
          <Row>
            <Image src={loggedinUser.avatar} />
          </Row>
          <Row>
            <Col>
              <Card className="m-1">
                <div className="profile-client-img">
                  <Image />
                </div>
                <h2>
                  {loggedinUser.firstname} {loggedinUser.lastname}
                </h2>
              </Card>
            </Col>
            <Col>
              <Card className="m-1">
                <h2>eseresr</h2>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ClientDashboard;
