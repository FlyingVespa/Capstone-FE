import React from "react";
import { useState } from "react";
import { Container, Button } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";

import reg from "../../Reg.png";

import RegBusiness from "./RegBusiness";

function RegsiterPage(routerProps) {
  let urlPath = routerProps.location.pathname;
  const [typeAccReg, setTypeAccReg] = useState("");

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
