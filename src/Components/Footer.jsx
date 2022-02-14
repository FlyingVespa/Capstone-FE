import React from "react";
import { Container, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiRedux,
  SiFirebase,
  SiLeaflet,
  SiMongodb,
} from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { IoLogoNodejs } from "react-icons/io";

function Footer() {
  return (
    <footer className="bottom">
      <Container>
        <Col>
          <Row>
            <p>
              BuyLocal.online webbap created by{" "}
              <a href="https://www.linkedin.com/in/hedrinel/">Hedri Nel</a> for
              demo purposes only. The following frameworks and libraries were
              used:
            </p>
          </Row>
          <Col id="aaa">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>JavaScript</Tooltip>}
            >
              <SiJavascript id="js" />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>JavaScript</Tooltip>}
            >
              <SiHtml5 id="html" />
            </OverlayTrigger>

            <SiCss3 id="css" />
            <SiReact id="react" />
            <SiRedux id="redux" />
            <SiFirebase id="firebase" />
            <SiLeaflet id="leaflet" />
            <IoLogoNodejs id="nodejs" />
            <SiMongodb id="mongodb" />
          </Col>
        </Col>
      </Container>
    </footer>
  );
}

export default Footer;
