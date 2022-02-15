import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";

import reg from "../../assets/images/register.gif";

import BusinessRegistration from "./BusinessRegistration";
import ClientRegistration from "./ClientRegistration";
function RegsiterPage({ routerProps, URL }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={5} xs={12}>
            {/* <Image src={reg} style={{ width: "100%" }} /> */}
          </Col>
          <Col md={7}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Standard Account" value="1" />
                  <Tab label="Business Account" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ClientRegistration URL={URL} />
              </TabPanel>
              <TabPanel value="2">
                <BusinessRegistration prop={routerProps} />
              </TabPanel>
            </TabContext>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RegsiterPage;
