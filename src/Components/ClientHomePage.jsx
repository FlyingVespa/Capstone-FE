import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewStores from "./ClientHomePage/NewStores";
import PopularStores from "./ClientHomePage/PopularStores";
import SavedStores from "./ClientHomePage/SavedStores";
import Map from "./ClientHomePage/Map";

import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
function ClientHomePage() {
  const URL = process.env.REACT_APP_API_URL;

  const [users, setUsers] = useState({
    _id: null,
    basic: {
      name: null,
      category: null,
    },
    location: {
      city: null,
      country: null,
    },
    info: {
      img_logo: null,
    },
  });

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${URL}/business`);
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
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
    <Container>
      <SearchBar />

      <Map />

      <Container>
        <SavedStores users={users} />
        <PopularStores users={users} />
        <NewStores users={users} />
      </Container>
    </Container>
  );
}

export default ClientHomePage;
