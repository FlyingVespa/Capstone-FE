// Libraries
// Styling
import { Col, Row, Accordion, Image } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";
import { IoIosPin, IoMdMail, IoMdCall } from "react-icons/io";
import envelopeIcon from "../../assets/icons/envelope.svg";
import mapIcon from "../../assets/icons/map-location-dot.svg";
import phoneIcon from "../../assets/icons/phone.svg";

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
                    <Col xs={5}>
                      <Image src={phoneIcon} alt="map-icon" id="about-icon" />{" "}
                      <span>Phone:</span>
                    </Col>
                    <Col xs={7}>
                      <span>{data?.companydetails?.mobile}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5}>
                      <Image
                        src={envelopeIcon}
                        alt="map-icon"
                        id="about-icon"
                      />{" "}
                      <span>Email:</span>
                    </Col>
                    <Col xs={7}>
                      <span>{data?.companydetails?.public_email}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5}>
                      <Image src={mapIcon} alt="map-icon" id="about-icon" />
                      <span>Address:</span>
                    </Col>
                    <Col xs={7}>
                      {data.address !== undefined ? (
                        <span className="mx-2">
                          {data?.address?.street_number}
                          {data?.address?.street_name}, {data?.address?.city},{" "}
                          {data?.address?.state}, {data?.address?.country}
                        </span>
                      ) : (
                        <span>unknown</span>
                      )}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <p>{data.companydetails?.bio}</p>
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
                <p>{data.companydetails?.bio}</p>
              </Row>
              <Row>
                <Col>
                  <Image src={mapIcon} alt="map-icon" id="about-icon" />
                  <span>Address:</span>
                  {data.address !== undefined ? (
                    <span className="mx-2">
                      {data?.address?.street_number}{" "}
                      {data?.address?.street_name}, {data?.address?.city},{" "}
                      {data?.address?.state}, {data?.address?.country}
                    </span>
                  ) : (
                    <span>unknown</span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Image src={phoneIcon} alt="phone-icon" id="about-icon" />
                  <span>Phone:</span>
                  <span className="mx-2">{data?.companydetails?.mobile}</span>
                </Col>
              </Row>
              <Row>
                <Col onClick={sendEmail}>
                  <Image src={envelopeIcon} alt="email-icon" id="about-icon" />
                  <span>Email:</span>
                  <span className="mx-2" on>
                    {data?.companydetails?.public_email}
                  </span>
                </Col>
              </Row>
              {/* <hr /> */}
            </>
          )}
        </Col>
      )}
    </>
  );
}

export default About;
