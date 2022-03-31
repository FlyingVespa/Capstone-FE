// Libraries
// Styling
import { Col, Row, Accordion } from "react-bootstrap";
import { FiInfo, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { IoIosPin, IoMdMail, IoMdCall } from "react-icons/io";

function About({ data, contact }) {
  function sendEmail() {
    window.location = `mailto:${data.companydetails.public_email}`;
  }
  let windowWidth = window.innerWidth;
  return (
    <>
      {data !== undefined && (
        <Col sm={12} md={7} className="profile-about">
          {windowWidth < 720 ? (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FiInfo className="mx-2" />
                  ABOUT US
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <p>{data.bio}</p>
                  </Row>
                  <Row>
                    <span>Address:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                  <Row>
                    <span>Phone:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                  <Row>
                    <span>Email:</span>
                    <span>{contact?.cell}</span>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ) : (
            <>
              <Row>
                <p>
                  <FiInfo className="mx-2" />
                  ABOUT US
                </p>
                <p>{data.bio}</p>
              </Row>
              <Row>
                <Col>
                  <IoIosPin />
                  <span>Address:</span>
                  <span className="mx-2">
                    {/* {data.address.street_number && (
                      <>
                        {data?.address?.street_number}{" "}
                        {data?.address?.street_name}, {data?.address?.city},{" "}
                        {data?.address?.state}, {data?.address?.country}
                      </>
                    )} */}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <IoMdCall />
                  <span>Phone:</span>
                  <span className="mx-2">{data?.companydetails?.mobile}</span>
                </Col>
              </Row>
              <Row>
                <Col onClick={sendEmail}>
                  <IoMdMail />
                  <span>Email:</span>
                  <span className="mx-2" on>
                    {data?.companydetails?.public_email}
                  </span>
                </Col>
              </Row>
            </>
          )}
        </Col>
      )}
    </>
  );
}

export default About;
