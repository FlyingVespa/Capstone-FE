//Libraries
// Styling
import { Col, Accordion, Table } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
// Components
import LockClockIcon from "@mui/icons-material/LockClock";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import LockIcon from "@mui/icons-material/Lock";
function TradingHours({ data, t, date }) {
  var currentdate = new Date();
  var dateDay = currentdate.getDay();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  const confirmDay = (i) => {
    switch (date.times[i]) {
      case 0:
        return "Sunday";
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";

      default:
        return "unknown";
    }
  };

  let windowWidth = window.innerWidth;
  var myStyle = {
    borderLeft: "1px solid #222",
    color: "#red",
  };
  return (
    <>
      {/* <h5>{date.times[0].day}</h5> */}
      {/* <h5>{users}</h5> */}
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
                                      {" "}
                                      <AlarmOnIcon className="mx-2" /> {d.open}
                                    </td>
                                    <td>
                                      <LockClockIcon className="mx-2" />
                                      {d.closed}
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
                                      {d.open}
                                    </td>
                                    <td>
                                      <LockClockIcon className="mx-2" />
                                      {d.closed}
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
            </Accordion>
          </>
        ) : (
          <>
            {/* <p>
              <BiTime className="mx-2" />
              TRADING HOURS
            </p> */}

            <Table borderless>
              <thead>
                <BiTime className="mx-2" />
                TRADING HOURS
              </thead>
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
                                {" "}
                                <AlarmOnIcon className="mx-2" /> {d.open}
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                {d.closed}
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
                                {d.open}
                              </td>
                              <td>
                                <LockClockIcon className="mx-2" />
                                {d.closed}
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

      {/* {tradinghours !== undefined ? <p>open</p> : <p>loading</p>} */}

      {/* </ul> */}
    </>
  );
}

export default TradingHours;
