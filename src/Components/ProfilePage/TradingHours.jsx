import React from "react";
import { Col, Accordion, Card } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
function TradingHours({ data, t }) {
  if (data !== undefined && data !== null) {
    // const tradinghours = Object.keys(data?.times);
  }

  React.useEffect(() => {
    function handleResize() {
      window.location.reload();
    }
    window.addEventListener("resize", handleResize);
  });

  let windowWidth = window.innerWidth;
  console.log(windowWidth);
  // let operatingHours = Object.keys(data.times);
  // console.log("sss", operatingHours);
  return (
    <>
      <Col sm={12} md={5}>
        {windowWidth < 720 ? (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Trading Hours</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li></li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          <>
            <p>
              <BiTime className="mx-2" />
              TRADING HOURS
            </p>
            <Card>
              {/* {operatingHours?.map((time, i) => (
                <p>{time.trading}</p>
              ))} */}
            </Card>
          </>
        )}
      </Col>

      {/* {tradinghours !== undefined ? <p>open</p> : <p>loading</p>} */}

      {/* </ul> */}
    </>
  );
}

export default TradingHours;
