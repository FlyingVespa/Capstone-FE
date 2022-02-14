import React, { useSelector } from "react";
import { Col, Accordion, Card } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
function TradingHours({ data, t }) {
  let windowWidth = window.innerWidth;

  return (
    <>
      <Col sm={12} md={5}>
        {windowWidth < 720 ? (
          <>
            <hr />
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <BiTime className="mx-2" />
                  TRADING HOURS
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li></li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
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
