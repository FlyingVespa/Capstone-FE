import React from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Image,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import NewStores from "./ClientHomePage/NewStores";
import PopularStores from "./ClientHomePage/PopularStores";
import SavedStores from "./ClientHomePage/SavedStores";
import Map from "./ClientHomePage/Map";

import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
function ClientHomePage() {
  return (
    <Container>
      <SearchBar />

      <Map />

      <Container>
        <SavedStores />
        <PopularStores />
        <NewStores />
      </Container>
    </Container>
  );
}

export default ClientHomePage;
