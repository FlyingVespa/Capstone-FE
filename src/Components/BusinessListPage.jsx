import { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import "./ClientHomePage/clienthomepage.css";
import ListMap from "./BusinessListPage/ListMap";
import SearchBar from "./ClientHomePage/SearchBar";
import ShopCard from "./BusinessListPage/ShopCard";
import { fetchUsers } from "../redux";

const BusinessListPage = ({ props, fetchUsers, usersData }) => {
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
      <Col>
        <h1>Find & Buy Local</h1>

        <SearchBar usersData={usersData} />

        <div className="my-5">
          <ListMap />
        </div>
      </Col>

      <div>
        <Row className="g-3">
          {usersData &&
            usersData.users &&
            usersData.users.map((user) => <ShopCard user={user} />)}
        </Row>
      </div>
    </Container>
  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(BusinessListPage);
