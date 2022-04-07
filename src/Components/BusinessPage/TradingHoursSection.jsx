//Libraries
import { useState, useEffect } from "react";
// Styling
import { Col, Accordion, Table } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
// Components
import LockClockIcon from "@mui/icons-material/LockClock";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import LockIcon from "@mui/icons-material/Lock";
function TradingHoursSection({ data, test }) {
  let d = new Date();
  let today = d.getDay();

  console.log("today", today);
  const [currentTime, setCurrentTime] = useState("20:30");

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // let day = weekday[d.getDay()];

  // const confirmDay = (i) => {
  //   switch (date.times[i]) {
  //     case 0:
  //       return "Sunday";
  //     case 1:
  //       return "Sunday";
  //     case 2:
  //       return "Monday";
  //     case 3:
  //       return "Tuesday";
  //     case 4:
  //       return "Wednesday";
  //     case 5:
  //       return "Thursday";
  //     case 6:
  //       return "Friday";

  //     default:
  //       return "unknown";
  //   }
  // };

  const checkIfOpen = () => {
    let ds = new Date();
    let todays = ds.getDay();
    if (data) {
      data.map((test) => {
        console.log(test.day);
      });
    }

    // openingHours.split(":");
    if (data[todays].trading === true) {
      console.log("ture");
    } else {
      console.log("false");
    }
    // console.log("openingHours", openingHours);
  };

  useEffect(() => {
    checkIfOpen();
  });

  let windowWidth = window.innerWidth;
  var myStyle = {
    borderLeft: "1px solid #222",
    color: "#red",
  };
  return (
    <>
      <Col sm={12} md={5}>
        {windowWidth < 720 ? (
          <>
            <hr />
            {/* <Accordion>
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
                                  <td colSpan={2}>
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
                                  <td colSpan={2}>
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
          <>
            <p className="mb-4">
              <BiTime className="mx-2" />
              TRADING HOURS
            </p>
            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
            />
            {currentTime && <p>{currentTime}</p>}
            {/* <p>{openingHours}</p> */}
            <Table borderless>
              <tbody>
                {data &&
                  data.map((d, i) => (
                    <tr id="table-row">
                      {today === d.day ? (
                        <>
                          <td>
                            <span>{weekday[i]}</span>
                          </td>
                          {d.trading === true ? (
                            <>
                              <td>
                                <AlarmOnIcon className="mx-2" />{" "}
                                {d.openingHours}
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                {d.closingHours}
                              </td>
                            </>
                          ) : (
                            <td colSpan={2}>
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
                                <span>{d.openingHours}</span>
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                <span>{d.closingHours}</span>
                              </td>
                            </>
                          ) : (
                            <td colSpan={2}>
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
          </>
        )}
      </Col>
    </>
  );
}

export default TradingHoursSection;
