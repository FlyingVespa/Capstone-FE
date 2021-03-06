// Styling
import { useState, useEffect } from "react";
import { FormLabel, FormGroup } from "@mui/material";

import { Col, Row, FormControl, Form } from "react-bootstrap";

const TradingHoursDetails = ({ f, d, s }) => {
  const [time, setTime] = useState([
    { day: 0, trading: false, open: "08:20", closed: "17:00" },
    { day: 1, trading: true, open: "08:20", closed: "17:00" },
    { day: 2, trading: true, open: "08:20", closed: "17:00" },
    { day: 3, trading: true, open: "08:20", closed: "17:00" },
    { day: 4, trading: true, open: "08:20", closed: "17:00" },
    { day: 5, trading: true, open: "08:20", closed: "17:00" },
    { day: 6, trading: false, open: "08:20", closed: "17:00" },
  ]);

  const handleTimeChange = ({ target }) => {
    const newTime = [...time];
    newTime[target.name][target.id] = target.value;
    setTime(newTime);
    f(time);
  };
  const handleTrading = ({ target }) => {
    const newTime = [...time];
    newTime[target.name][target.id] = target.checked;
    f(time);
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="m-0">
      <FormGroup>
        {d ? (
          <></>
        ) : (
          <FormLabel component="legend" className="text-center">
            Trading Hours & Days
          </FormLabel>
        )}

        {time &&
          time.map((item, i) => (
            <Row className="trading-hours">
              <Col xs={3}>
                <Form.Check
                  type="switch"
                  label={weekday[i]}
                  id="trading"
                  name={i}
                  checked={time[i].trading}
                  onChange={handleTrading}
                  disabled={s}
                />
              </Col>
              {item.trading === true ? (
                <>
                  <Col xs={3}>
                    <FormControl
                      id="open"
                      name={i}
                      type="time"
                      value={time[i].open}
                      onChange={handleTimeChange}
                      disabled={s}
                    />
                  </Col>
                  <Col xs={1}>
                    <p>to</p>
                  </Col>
                  <Col xs={3}>
                    <FormControl
                      id="closed"
                      name={i}
                      type="time"
                      value={time[i].closed}
                      onChange={handleTimeChange}
                      disabled={s}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                    <p>Closed</p>
                  </Col>
                </>
              )}
            </Row>
          ))}
      </FormGroup>
    </div>
  );
};

export default TradingHoursDetails;
