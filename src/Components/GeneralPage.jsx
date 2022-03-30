import { Container, Col } from "react-bootstrap";

import GeneralMap from "./GeneralMap";

const GeneralPage = () => {
  return (
    <div id="page">
      <Container className="homepage">
        <Col>
          <h1>Find & Buy Local</h1>
          <GeneralMap />
        </Col>
      </Container>
    </div>
  );
};

export default GeneralPage;
