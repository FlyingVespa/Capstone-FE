import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Col, Spinner } from "react-bootstrap";
import { Map, GoogleApiWrapper } from "google-maps-react";
import SavedStores from "./ClientHomePage/SavedStores";
import "./ClientHomePage/clienthomepage.css";
import SearchBar from "./ClientHomePage/SearchBar";
import { fetchUsers } from "../Redux";

function HomePage({ props, fetchUsers, usersData }) {
  useEffect(() => {
    fetchUsers();
  }, []);

  return usersData.loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : usersData.error ? (
    <h1>{usersData.error}</h1>
  ) : (
    <Container className="homepage">
      <Jumbotron>
        <Col>
          <h1>Find & Buy Local</h1>

          <SearchBar usersData={usersData} />
        </Col>
      </Jumbotron>

      <Container>
        <div>
          {usersData &&
            usersData.users &&
            usersData.users.map((user) => (
              <Link to={`/business/${user._id}`}>
                {" "}
                <p>{user.email}</p>
              </Link>
            ))}
        </div>
        {/* <SavedStores user={usersData} /> */}
      </Container>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    usersData: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
