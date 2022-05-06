// libraries
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// styling
import { Col, Row, Image, Container, Button } from "react-bootstrap";

// components
import fillout from "../../assets/images/fillout.gif";
import BusinessRegistration from "./BusinessRegistration";
import ClientRegistration from "./ClientRegistration";

function RegsiterPage({ routerProps }) {
  let typeOfRegistration = useSelector((s) => s.helper.register);
  let navigate = useNavigate();

  return (
    <Container className="register page">
      <Row>
        <Col className="d-md-block d-sm-none" md={{ span: 7, order: 1 }}>
          <Image src={fillout} />
        </Col>

        <Col md={{ span: 5, order: 1 }} xs={{ span: 12, order: 1 }}>
          <Button
            onClick={() => navigate("/register/business")}
            className="mx-2"
          >
            Register Business
          </Button>
          <Button onClick={() => navigate("/register/client")} className="mx-2">
            Regsiter Client
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default RegsiterPage;
