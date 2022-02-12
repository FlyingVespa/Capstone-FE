import React from "react";
// import ContentLoader from "react-content-loader";
import { Container, Spinner } from "react-bootstrap";

function PageLoad(props) {
  return (
    <>
      (
      <Container style={{ height: "80vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
      )
    </>
  );
}

export default PageLoad;
