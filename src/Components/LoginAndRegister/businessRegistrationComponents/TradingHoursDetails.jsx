// Styling
import { useState } from "react";
import {
  FormControl,
  Checkbox,
  TextField,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { Col, Row, ToggleButton } from "react-bootstrap";
const TradingHoursDetails = ({ d, f, c, t }) => {
  const inputLProps = { shrink: true };
  const inputProps = { step: 300 };
  const [checked, setChecked] = useState(false);
  return (
    <div className="tradinghours-details">
      <FormLabel component="legend">Trading Hours & Days</FormLabel>
      <FormGroup>
        {d &&
          d.map((item, i) => (
            <Row>
              <Col xs={3}>
                <label>
                  <ToggleButton
                    day={item.day}
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={item.trading}
                    value={item.trading}
                    onChange={t}
                  >
                    <p>{JSON.stringify(item.trading)}</p>
                  </ToggleButton>
                  {`${item.trading}`}
                </label>
              </Col>
              {!item.trading ? (
                <Col xs={7}>
                  <div>
                    <p>Closed</p>
                  </div>
                </Col>
              ) : (
                <Col xs={8}>
                  <Row className="time-row">
                    <Col xs={5} className="">
                      <TextField
                        name={item}
                        variant="standard"
                        id="open"
                        label="open"
                        type="time"
                        value={item.open}
                        InputLabelProps={inputLProps}
                        inputProps={inputProps}
                        onChange={f}
                      />
                    </Col>
                    <Col xs={2} className="text-center">
                      to
                    </Col>
                    <Col xs={5} className="">
                      <TextField
                        name={item}
                        variant="standard"
                        id="closed"
                        label="close"
                        type="time"
                        value={item.closed}
                        onChange={f}
                        InputLabelProps={inputLProps}
                        inputProps={inputProps}
                      />
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          ))}
      </FormGroup>
    </div>
  );
};

export default TradingHoursDetails;
