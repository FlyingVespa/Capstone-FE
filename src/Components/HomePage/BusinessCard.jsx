// libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// styling
import { Card, Row, Col, Badge, Image } from "react-bootstrap";
// components
import { TiLocationOutline } from "react-icons/ti";
import openSign from "../../assets/images/open.png";
import closeSign from "../../assets/images/closed.png";

function BusinessCard({ item, checked }) {
  const [tradingStatus, setTradingStatus] = useState(false);

  let navigate = useNavigate();

  const checkIfOpen = async () => {
    if (item) {
      let d = new Date();
      let today = await parseInt(d.getDay());
      let currentTime = d.getHours() * 60 + d.getMinutes();
      let openH = item.tradingtimes[today].openingHours.split(":");
      let closeH = item.tradingtimes[today].closingHours.split(":");
      let openHour = parseInt(openH[0] * 60) + parseInt(openH[1]);
      let closingHour = parseInt(closeH[0] * 60) + parseInt(closeH[1]);

      if (item.tradingtimes[today].trading === true) {
        console.log("openH", currentTime);
        if (openHour < currentTime && closingHour > currentTime) {
          console.log("Currently open");
          setTradingStatus(true);
        } else {
          setTradingStatus(false);
        }
      } else {
        setTradingStatus(false);
      }
    }
  };

  useEffect(() => {
    checkIfOpen();
  }, []);

  return (
    <>
      {!checked ? (
        <Row className="m-1">
          <Card
            id="business_card"
            onClick={() => navigate(`/business/${item._id}`)}
          >
            <div className="card-horizontal">
              {tradingStatus ? (
                <Badge id="trading_status_badge" bg="success">
                  <Image src={openSign} />
                </Badge>
              ) : (
                <Badge id="trading_status_badge" bg="warning">
                  <Image src={closeSign} />
                </Badge>
              )}
              <Col lg={5}>
                <Image src={item.img_logo} alt={item.businessname + "image"} />
              </Col>
              <Col lg={7}>
                <h5>{item.businessname}</h5>
                <p>{item.category}</p>
                <p>{item.address?.city}</p>
              </Col>
            </div>
          </Card>
        </Row>
      ) : tradingStatus ? (
        <Row className="m-1">
          <Card id="business_card">
            <div className="card-horizontal">
              <Badge id="trading_status_badge" bg="success">
                <Image src={openSign} />
              </Badge>

              <Col lg={5}>
                <Image src={item.img_logo} alt={item.businessname + "image"} />
              </Col>
              <Col lg={7}>
                <h5>{item.businessname}</h5>
                <p>{item.category}</p>
                <p>{item.address?.city}</p>
              </Col>
            </div>
          </Card>
        </Row>
      ) : null}
    </>
  );
}

export default BusinessCard;
