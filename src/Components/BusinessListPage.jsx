import { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import "./ClientHomePage/clienthomepage.css";

import SearchBar from "./ClientHomePage/SearchBar";

const BusinessListPage = ({ props }) => {
  <Container className="homepage">
    <Col>
      <h1>Find & Buy Local</h1>
      <SearchBar />
      <div className="my-5"></div>
    </Col>
  </Container>;
};

export default BusinessListPage;
