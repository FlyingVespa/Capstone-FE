import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Jumbotron, Col, Spinner } from "react-bootstrap";
import { Map, GoogleApiWrapper } from "google-maps-react";
import SavedStores from "./ClientHomePage/SavedStores";
import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
import { fetchUsersReq } from "../Redux/";
import axios from "axios";

function HomePage({ props }) {
  const URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [usersData, setUsersData] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllBusinessUsers = async () => {
    axios()
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/business`);
      if (response.ok) {
        const usersData = await response.json();
        await setUsersData(usersData);
        setLoading(false);
        console.log(usersData);
      } else {
        throw new Error("Could access data, but something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container className="homepage">
      <Jumbotron>
        <Col>
          <h1>Find & Buy Local</h1>

          <SearchBar usersData={usersData} />
        </Col>
      </Jumbotron>
      {usersData & loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""
          />
          <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          />

          <SavedStores user={usersData} />
        </Container>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users.allBusinesses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    users: () => dispatch(fetchUsersReq()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
