// Libraries
import { useEffect } from "react";

// Styling
import { Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FormLabel } from "@mui/material";
import LockClockIcon from "@mui/icons-material/LockClock";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import LockIcon from "@mui/icons-material/Lock";

import {
  BiStore,
  BiUserCircle,
  BiShield,
  BiWindowAlt,
  BiEnvelope,
  BiPhone,
  BiBuildingHouse,
  BiLock,
  BiGridAlt,
  BiTime,
  BiAlarmOff,
  BiAlarm,
} from "react-icons/bi";

// Component
import MapDetails from "./MapDetails";

const ConfirmDetails = ({ details }) => {
  // const details = useSelector((s) => s.users.registerBusiness);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    console.log("Confirm details:", details);
  });

  return (
    <>
      <div className="confirm-details">
        <FormLabel component="legend">Confirm Details</FormLabel>
        <Row>
          <Col xs={12} md={6} className="p-1">
            <Card>
              <p className="text-center fw-bold">Account & Contact Details</p>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiStore className="mx-1" />
                  <span>Account Email</span>
                </Col>
                <Col>
                  <span>{details.accdetails?.email}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiStore className="mx-1" />
                  <span>Business Name</span>
                </Col>
                <Col>
                  <span>{details.accdetails?.businessname}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiUserCircle className="mx-1" />
                  <span>Username</span>
                </Col>
                <Col>
                  <span>{details.accdetails?.username}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiBuildingHouse className="mx-1" />
                  <span>Business Category</span>
                </Col>
                <Col>
                  <span>{details.accdetails?.category}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiShield className="mx-1" />
                  <span>Password</span>
                </Col>
                <Col>
                  <span>{details.accdetails?.password}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiEnvelope className="mx-1" />
                  <span>Public Email</span>
                </Col>
                <Col>
                  <span>{details.contact?.public_email}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
              <Row>
                <Col>
                  <BiPhone className="mx-1" />
                  <span>Mobile</span>
                </Col>
                <Col>
                  <span>{details.contact?.cell}</span>
                </Col>
              </Row>
              <hr className="m-0 p-0" />
            </Card>
          </Col>
          <Col xs={12} md={6} className="p-1">
            <Card>
              <span className="text-center fw-bold">Operating Hours</span>
              <hr className="m-0 p-0" />

              {details.tradingtimes &&
                details.tradingtimes.map((item, i) => {
                  return (
                    <>
                      <Row key={i}>
                        <Col xs={4}>
                          <span>{weekday[i]}</span>
                        </Col>
                        {item.trading === false ? (
                          <>
                            <Col>
                              <span id="times-day">
                                <BiLock className="mx-2" />
                                closed
                              </span>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col xs={3} className="p-0">
                              <span id="times-day">
                                <BiAlarm className="mx-2" />
                                {item.open}
                              </span>
                            </Col>
                            <Col xs={1}>
                              <span>~</span>
                            </Col>
                            <Col xs={3} className="p-0">
                              <span id="times-day">
                                <BiAlarmOff className="mx-2" />
                                {item.closed}
                              </span>
                            </Col>
                          </>
                        )}
                      </Row>
                      <hr className="m-0 p-0" />
                    </>
                  );
                })}
            </Card>
          </Col>
          <Col xs={12} className="p-1">
            <Card className="address-card">
              <p className="text-center fw-bold">Address Details</p>

              <Col>
                <span>{details.address?.street_number} </span>
                <span>{details.address?.street_name}, </span>
                <span>{details.address?.city}, </span>
                <span>{details.address?.state}, </span>
                <span>{details.address?.country}</span>
                <MapDetails address={details.address} />
              </Col>
            </Card>
          </Col>
        </Row>
        <br />
      </div>
    </>
  );
};

export default ConfirmDetails;
