import { useEffect, useState } from "react";
import { Container, Jumbotron, Col, Spinner } from "react-bootstrap";
import NewStores from "./ClientHomePage/NewStores";
import PopularStores from "./ClientHomePage/PopularStores";
import SavedStores from "./ClientHomePage/SavedStores";
import Map from "./ClientHomePage/Map";
import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
import SimpleMap from "./ProfilePage/SimpleMap";
import MapTest from "./MapTest";

function HomePage({ props }) {
  const URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [usersData, setUsersData] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <div id="map"></div>
          {/* <SimpleMap /> */}
          <MapTest />
          <SavedStores user={usersData} />
        </Container>
      )}
    </Container>
  );
}

export default HomePage;
