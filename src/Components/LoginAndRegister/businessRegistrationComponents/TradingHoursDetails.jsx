// Styling
import { useState } from "react";
import {
  Checkbox,
  TextField,
  FormLabel,
  FormGroup,
  Switch,
} from "@mui/material";

import { Col, Row, FormControl, Form } from "react-bootstrap";

const TradingHoursDetails = ({ f }) => {
  const inputLProps = { shrink: true };
  const inputProps = { step: 300 };
  const [checked, setChecked] = useState(false);

  const [time, setTime] = useState([
    { day: 0, trading: true, open: "22:20", closed: "17:00" },
    { day: 1, trading: true, open: "23:20", closed: "17:00" },
    { day: 2, trading: true, open: "23:20", closed: "17:00" },
    { day: 3, trading: true, open: "01:20", closed: "17:00" },
    { day: 4, trading: true, open: "01:20", closed: "17:00" },
    { day: 5, trading: true, open: "01:20", closed: "17:00" },
    { day: 6, trading: true, open: "01:20", closed: "17:00" },
  ]);

  const handleTimeChange = ({ target }) => {
    const newTime = [...time];
    newTime[target.name][target.id] = target.value;
    setTime(newTime);
    f(time);
    console.log(time);
  };
  const handleTrading = ({ target }) => {
    const newTime = [...time];
    newTime[target.name][target.id] = target.checked;
    f(time);
    console.log(time);
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
        <FormLabel component="legend" className="text-center">
          Trading Hours & Days
        </FormLabel>
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
