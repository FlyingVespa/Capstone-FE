import React from "react";
import { useState } from "react";
import { Container, Button } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";

import reg from "../../Reg.png";

import RegBusiness from "./RegBusiness";

function RegsiterPage({ routerProps }) {
  const { match, location, history } = routerProps;
  let urlPath = location.pathname;
  const [typeAccReg, setTypeAccReg] = useState("business");

  return (
    <div>
      <Container>
        <Row>
          <Col md={5} xs={12}>
            <Image src={reg} style={{ width: "100%" }} />
          </Col>
          <Col md={7}>
            <h1>Regsiter</h1>
            <div>You are now at {urlPath}</div>
            <Button>
              <Link to="/register/business" exact replace>
                Register Business
              </Link>
            </Button>
            <Button>
              <Link to="/register/user" exact replace>
                Register UserAcc
              </Link>
            </Button>

            <RegBusiness />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default withRouter(RegsiterPage);
