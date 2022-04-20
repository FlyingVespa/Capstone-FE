//Libraries
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Styling
import { Col, Accordion, Table } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
// Components
import LockClockIcon from "@mui/icons-material/LockClock";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import LockIcon from "@mui/icons-material/Lock";
import { red } from "@mui/material/colors";
function TradingHoursSection({ data, test }) {
  let dispatch = useDispatch();
  let d = new Date();
  let today = d.getDay();

  let tradingStatus = useSelector((s) => s.users.storeTradingStatus);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const checkIfOpen = async () => {
    if (data) {
      let d = new Date();
      let today = await parseInt(d.getDay());
      let currentTime = d.getHours() * 60 + d.getMinutes();
      let openH = data[today].openingHours.split(":");
      let closeH = data[today].closingHours.split(":");
      let openHour = parseInt(openH[0] * 60) + parseInt(openH[1]);
      let closingHour = parseInt(closeH[0] * 60) + parseInt(closeH[1]);

      if (data[3].trading === true) {
        if (openHour < currentTime && closingHour > currentTime) {
          console.log("Currently open");
          dispatch({ type: "STORE_TRADING_STATUS", payload: true });
        } else {
          dispatch({ type: "STORE_TRADING_STATUS", payload: false });
        }
      } else {
        dispatch({ type: "STORE_TRADING_STATUS", payload: false });
      }
    }
  };

  useEffect(() => {
    checkIfOpen();
  });

  let windowWidth = window.innerWidth;

  return (
    <>
      <Col sm={12} md={5}>
        {windowWidth < 720 ? (
          <>
            <hr />
            {/* <Accordion className="trading-section">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <BiTime className="mx-2" />
                  TRADING HOURS
                </Accordion.Header>
                <Accordion.Body>
                  <Table borderless>
                    <tbody>
                      {data &&
                        data.map((d, i) => (
                          <tr id="table-row">
                            {dateDay === d.day ? (
                              <>
                                <td>
                                  <span>{weekday[i]}</span>
                                </td>
                                {d.trading === true ? (
                                  <>
                                    <td>
                                      <AlarmOnIcon className="mx-2" />
                                      <span>{d.openingHours}</span>
                                    </td>
                                    <td>
                                      <LockClockIcon className="mx-2" />
                                      <span>{d.closingHours}</span>
                                    </td>
                                  </>
                                ) : (
                                  <td colSpan={2} className="text-center">
                                    <LockIcon className="mx-2" />
                                    Closed
                                  </td>
                                )}
                              </>
                            ) : (
                              <>
                                <td>
                                  <span>{weekday[i]}</span>
                                </td>
                                {d.trading === true ? (
                                  <>
                                    <td>
                                      <AlarmOnIcon className="mx-2" />
                                      {d.openingHours}
                                    </td>
                                    <td>
                                      <LockClockIcon className="mx-2" />
                                      {d.closingHours}
                                    </td>
                                  </>
                                ) : (
                                  <td colSpan={2} className="text-center">
                                    <LockIcon className="mx-2" />
                                    Closed
                                  </td>
                                )}
                              </>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </>
        ) : (
          <div className="trading-section">
            <p className="mb-4">
              <BiTime className="mx-2" />
              TRADING HOURS
            </p>
            <Table borderless>
              <tbody>
                {data &&
                  data.map((d, i) => (
                    <tr id="table-row" key={d.day + i}>
                      {today === d.day ? (
                        <>
                          <td>
                            <strong>
                              <em>
                                <span>{weekday[i]}</span>
                              </em>
                            </strong>
                          </td>
                          {d.trading === true ? (
                            <>
                              <td>
                                <AlarmOnIcon className="mx-2" />
                                <strong>
                                  <em>
                                    <span>{d.openingHours}</span>
                                  </em>
                                </strong>
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                <strong>
                                  <em>
                                    <span>{d.closingHours}</span>
                                  </em>
                                </strong>
                              </td>
                            </>
                          ) : (
                            <td colSpan={2} className="text-center">
                              <LockIcon className="mx-2" />
                              <strong>
                                <em>
                                  <span>Closed</span>
                                </em>
                              </strong>
                            </td>
                          )}
                        </>
                      ) : (
                        <>
                          <td>
                            <span>{weekday[i]}</span>
                          </td>
                          {d.trading === true ? (
                            <>
                              <td>
                                <AlarmOnIcon className="mx-2" />
                                <span>{d.openingHours}</span>
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                <span>{d.closingHours}</span>
                              </td>
                            </>
                          ) : (
                            <td colSpan={2} className="text-center">
                              <LockIcon className="mx-2" />
                              <span>Closed</span>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </>
  );
}

export default TradingHoursSection;
