// Libraries
// Styling
import {
  Col,
  Row,
  Accordion,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
                      <span id="about-info">Phone:</span>
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
                      <span id="about-info">Email:</span>
                    </Col>
                    <Col xs={7}>
                      <span>{data?.companydetails?.public_email}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5}>
                      <Image src={mapIcon} alt="map-icon" id="about-icon" />
                      <span id="about-info">Address:</span>
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
            <div className="about-section">
              <Row>
                <p>
                  <FiInfo className="mx-2" />
                  ABOUT US
                </p>
                <p>{data.companydetails?.bio}</p>
              </Row>
              <div className="about-section-info">
                <Row>
                  <Col>
                    <Image src={mapIcon} alt="map-icon" id="about-icon" />
                    <span id="about-info">Address:</span>
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
                    <span id="about-info">Phone:</span>
                    <span className="mx-2">{data?.companydetails?.mobile}</span>
                  </Col>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement={"bottom"}
                    overlay={<Tooltip>Click to email us</Tooltip>}
                  >
                    <Col onClick={sendEmail} style={{ cursor: "pointer" }}>
                      <Image
                        src={envelopeIcon}
                        alt="email-icon"
                        id="about-icon"
                      />
                      <span id="about-info">Email:</span>
                      <span className="mx-2" on>
                        {data?.companydetails?.public_email}
                      </span>
                    </Col>
                  </OverlayTrigger>
                </Row>
                {/* <hr /> */}
              </div>
            </div>
          )}
        </Col>
      )}
    </>
  );
}

export default About;
