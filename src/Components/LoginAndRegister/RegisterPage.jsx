import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Image, Container } from "react-bootstrap";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";

// import reg from "../../assets/images/register.gif";
import fillout from "../../assets/images/fillout.gif";
import BusinessRegistration from "./BusinessRegistration";
import ClientRegistration from "./ClientRegistration";

function RegsiterPage({ routerProps }) {
  let typeOfRegistration = useSelector((s) => s.helper.register);

  return (
    <Container className="register page">
      <Row>
        <Col md={{ span: 5, order: 1 }} xs={{ span: 12, order: 2 }}>
          <Image src={fillout} />
        </Col>
        <Col md={{ span: 7, order: 1 }} xs={{ span: 12, order: 1 }}>
          {typeOfRegistration === "business" ? (
            <BusinessRegistration prop={routerProps} />
          ) : (
            <ClientRegistration prop={routerProps} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default RegsiterPage;
