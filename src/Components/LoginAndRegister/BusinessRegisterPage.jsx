import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";

import reg from "../../assets/images/register.gif";

import BusinessRegistration from "./BusinessRegistration";
import ClientRegistration from "./ClientRegistration";
function BusinessRegsiterPage({ routerProps, URL }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={5} xs={12}>
            <Image src={reg} style={{ width: "100%" }} />
          </Col>
          <Col md={7}>
            <BusinessRegistration prop={routerProps} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default BusinessRegsiterPage;
