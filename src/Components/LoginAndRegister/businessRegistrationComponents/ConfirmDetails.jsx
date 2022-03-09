// Libraries
import { useEffect } from "react";

// Styling
import { Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FormLabel } from "@mui/material";

// Component
import MapDetails from "./MapDetails";

const ConfirmDetails = ({ details }) => {
  const regBusiness = useSelector((s) => s.users.registerBusiness);
  const operatingHours = Object.keys(details.times);
  const {
    email,
    username,
    shipping,
    password,
    businessname,
    category,
    contact,
    address,
  } = regBusiness;

  useEffect(() => {
    console.log("Confirm details:", details);
  });
  return (
    <>
      <div className="confirm-details">
        <FormLabel component="legend" className="m-0">
          Confrim Details
        </FormLabel>
        <Row>
          <Col xs={12} md={6} className="p-2">
            <Card className="p-2">
              <p className="text-center fw-bold">Operating Hours</p>
              {operatingHours.map((day) => (
                <>
                  <Row>
                    <Col xs={6}>
                      <p id="times-day" className="p-0">
                        {day}
                      </p>
                    </Col>

                    {details.times[day].trading !== true ? (
                      <Col xs={6}>
                        <p>Closed</p>
                      </Col>
                    ) : (
                      <>
                        <Col xs={3} md={3} className="p-0">
                          <p id="times-open">{details.times[day].open}</p>
                        </Col>
                        <Col xs={3} md={3} className="p-0">
                          <p id="times-closed">{details.times[day].closed}</p>
                        </Col>
                      </>
                    )}
                  </Row>
                  <hr className="m-0 p-0" />
                </>
              ))}
            </Card>
          </Col>
          <Col xs={12} md={6} className="p-2">
            <Card className="p-2">
              <p className="text-center fw-bold">Account Details</p>
              <Row>
                <Col>
                  <p>Account Email</p>
                </Col>
                <Col>
                  <p>{email}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Business Name</p>
                </Col>
                <Col>
                  <p>{businessname}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Username</p>
                </Col>
                <Col>
                  <p>{username}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Business Category</p>
                </Col>
                <Col>
                  <p>{category}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Password</p>
                </Col>
                <Col>
                  <p>{password}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Delivery Service</p>
                </Col>
                <Col>
                  <p>{shipping}</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={12} className="p-2">
            <Card className="p-2">
              <p className="text-center fw-bold">Contact Details</p>
              <Row>
                <Col>
                  <p>Business Email (public)</p>
                </Col>
                <Col>
                  <p>{contact?.pub_email}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Business Mobile</p>
                </Col>
                <Col>
                  <p>{contact?.cell}</p>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <p>Business Landline</p>
                </Col>
                <Col>
                  <p>{contact?.tel}</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={12} className="p-2">
            <Card className="p-2">
              <p className="text-center fw-bold">Address Details</p>
              <Row>
                <Col>
                  <span>{details?.address.street_number} </span>
                  <span>{details?.address.street_name}, </span>
                  <span>{details?.address.city}, </span>
                  <span>{details?.address.state}, </span>
                  <span>{details?.address.country}</span>
                  <MapDetails address={details.address} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
      </div>
    </>
  );
};

export default ConfirmDetails;
