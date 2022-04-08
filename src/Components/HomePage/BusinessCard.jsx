// libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// styling
import { Card, Row, Col } from "react-bootstrap";
// components
import { TiLocationOutline } from "react-icons/ti";
import openSign from "../../assets/images/open.png";
import closeSign from "../../assets/images/closed.png";
function BusinessCard({ item }) {
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
      {/* <Card
        style={{ width: "100%" }}
        className="business_card"
        onClick={() => navigate(`/business/${item._id}`)}
      >
        <Card.Img variant="top" key={item._id} src={item.img_logo} />
        <Card.Body>
          <Card.Title>
            {" "}
            <p>{item.businessname}</p>
          </Card.Title>
          <Card.Text>
            <div className="p-2">
              {item.address.city && (
                <div>
                  <TiLocationOutline />
                  <p>{item.address?.city}</p>
                </div>
              )}
              {tradingStatus ? (
                <img src={openSign} id="trading_status_img" />
              ) : (
                <img src={closeSign} id="trading_status_img" />
              )}
            </div>
          </Card.Text>

        </Card.Body>
      </Card> */}
      <div class="row">
        <div class="card">
          <div class="card-horizontal">
            <div class="col-4">
              <img
                class=""
                src="http://via.placeholder.com/300x180"
                alt="Card image cap"
              />
            </div>
            <div class="col-8">
              <h4 class="card-title">Card title</h4>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessCard;

{
  /* 
 <p>{item.tradingtimes[today].closed}</p> 

  <p>{checkifopen(18, 1)}</p>

<p> {checkifopen(item, today)}</p>
                <p> {item.tradingtimes[1].closed}</p>
                <p> {}</p> 

 </div> 
 */
}
