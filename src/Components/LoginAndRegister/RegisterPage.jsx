import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Image, Container } from "react-bootstrap";

import reg from "../../Reg.png";

import RegBusiness from "./RegBusiness";

function RegsiterPage(routerProps) {
  let urlPath = routerProps.location.pathname;


  return (
    <div>
      <Container>
        <Row>
          <Col md={5} xs={12}>
            <Image src={reg} style={{ width: "100%" }} />
          </Col>
          <Col md={7}>
            <div>You are now at {urlPath}</div>

            <RegBusiness prop={routerProps} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default withRouter(RegsiterPage);
