import { useEffect, useState } from "react";
import { Container, Jumbotron, Col, Spinner } from "react-bootstrap";
import NewStores from "./ClientHomePage/NewStores";
import PopularStores from "./ClientHomePage/PopularStores";
import SavedStores from "./ClientHomePage/SavedStores";
import Map from "./ClientHomePage/Map";

import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";

function HomePage({ props }) {
  const URL = process.env.REACT_APP_API_URL;
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
  }, [usersData, loading]);

  const ss = Object.keys(usersData);
  return (
    <Container className="homepage">
      <Jumbotron>
        <Col>
          <h1>Find & Buy Local</h1>

          <SearchBar />
        </Col>
      </Jumbotron>
      {usersData & loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <Map />
          <SavedStores user={usersData} />
        </Container>
      )}
    </Container>
  );
}

export default HomePage;
