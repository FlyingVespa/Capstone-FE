import { Fragment } from "react";
import { Container, Card, Row, Col, Tab, Nav, Sonnet } from "react-bootstrap";

function GeneralData() {
  return (
    <div style={{ flexGrow: 1 }}>
      <h1>General Data</h1>
      <Fragment>
    
        <Row className="mx-0 p-0">
          <Col className="mx-0 p-0">
            <Card>
              <Card.Header>Total Listed Products</Card.Header>
              <Card.Body> 99</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mx-0 mt-2">
          <Col xs={4} className="mx-0  px-0">
            <Card className="border-success">
              <Card.Header>In Stock</Card.Header>
              <Card.Body className="text-success"> 99</Card.Body>
            </Card>
          </Col>
          <Col xs={4} className="mx-0  px-2">
            <Card className="border-warning">
              <Card.Header>Low Stock</Card.Header>
              <Card.Body className="text-warning"> 99</Card.Body>
            </Card>
          </Col>
          <Col xs={4} className="mx-0   px-0">
            <Card className="border-danger">
              <Card.Header>Out of Stock</Card.Header>
              <Card.Body className="text-danger"> 99</Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </div>
  );
}

export default GeneralData;
