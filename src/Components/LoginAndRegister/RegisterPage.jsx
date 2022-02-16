import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Image, Container } from "react-bootstrap";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";

// import reg from "../../assets/images/register.gif";
import fillout from "../../assets/images/fillout.gif"
import BusinessRegistration from "./BusinessRegistration";
import ClientRegistration from "./ClientRegistration";


function RegsiterPage({ routerProps }) {
  let typeOfRegistration = useSelector((s) => s.helper.register);

  return (
    <div>
      <Container>
        <Row>
          <Col md={5} xs={12}>
            <Image src={fillout} style={{ width: "100%" }} />
          </Col>
          <Col md={7}>
            {typeOfRegistration === "business" ? (
              <BusinessRegistration prop={routerProps} />
            ) : (
              <ClientRegistration prop={routerProps} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RegsiterPage;
