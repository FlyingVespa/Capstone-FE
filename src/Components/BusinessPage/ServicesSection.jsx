import React from "react";
import { Container, Col, Row, Accordion } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { FiTool } from "react-icons/fi";
import { BiTime } from "react-icons/bi";

function ServicesSection({ data }) {
  let windowWidth = window.innerWidth;
  console.log(data.companydetails);
  return (
    <Container>
      <hr />
      {windowWidth < 720 ? (
        <>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BiTime className="mx-2" />
                SERVICES
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  {data.companydetails &&
                    data.companydetails.store_services.map((item, i) => {
                      return (
                        <Col key={i} xs={12} sm={6} md={4} xl={3}>
                          <Container>
                            <div className="product-container">
                              <div className="product-item">
                                <span>{item}</span>
                              </div>
                            </div>
                          </Container>
                        </Col>
                      );
                    })}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ) : (
        <>
          <>
            <p>
              <FiTool className="mx-2" />
              SERVICES
            </p>
            <Row>
              {data.companydetails &&
                data.companydetails.store_services.map((item, i) => {
                  return (
                    <Col key={i} xs={6} sm={6} md={4} xl={3}>
                      <Container>
                        <div className="product-container">
                          <div className="product-item">
                            <span>{item}</span>
                          </div>
                        </div>
                      </Container>
                    </Col>
                  );
                })}
            </Row>
          </>
        </>
      )}
    </Container>
  );
}

export default ServicesSection;