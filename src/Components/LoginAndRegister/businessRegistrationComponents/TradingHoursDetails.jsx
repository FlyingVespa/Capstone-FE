// Styling
import {
  FormControl,
  Checkbox,
  TextField,
  FormLabel,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";

const TradingHoursDetails = ({ d, f, days }) => {
  const inputLProps = { shrink: true };
  const inputProps = { step: 300 };

  return (
    <div className="tradinghours-details">
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Trading Days Open/Closed</FormLabel>
        <FormGroup>
          {days.map((day) => (
            <Row>
              <Col xs={4}>
                <FormControlLabel
                  id="trading-day"
                  label={day}
                  control={
                    <Checkbox
                      id="trading"
                      name={day}
                      checked={d[day].trading}
                      onChange={f}
                    />
                  }
                />
              </Col>
              {!d[day].trading ? (
                <Col xs={7}>
                  <div>
                    <p>Closed</p>
                  </div>
                </Col>
              ) : (
                <Col xs={7}>
                  <Row className="time-row">
                    <Col xs={5} className="">
                      <TextField
                        name={day}
                        variant="standard"
                        id="open"
                        label="open"
                        type="time"
                        value={d[day].open}
                        InputLabelProps={inputLProps}
                        inputProps={inputProps}
                        onChange={f}
                      />
                    </Col>
                    <Col xs={2}>to</Col>
                    <Col xs={5} className="">
                      <TextField
                        name={day}
                        variant="standard"
                        id="closed"
                        label="close"
                        type="time"
                        value={d[day].closed}
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
      </FormControl>
    </div>
  );
};

export default TradingHoursDetails;
