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
import {
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Form,
} from "react-bootstrap";

const TradingHoursDetails = ({ d, f, c, datas, handleTrading }) => {
  const inputLProps = { shrink: true };
  const inputProps = { step: 300 };
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.value);
  };
  return (
    <div className="tradinghours-details" className="m-0">
      <FormGroup>
        <FormLabel component="legend" className="text-center">
          Trading Hours & Days
        </FormLabel>
        {d &&
          datas.times.map((item, i) => (
            <Row>
              <Col xs={3}>
                <Form.Select name="times" id="trading" onChange={handleTrading}>
                  <option selected hidden>
                    Choose here
                  </option>
                  <option name="times" id="trading" value="true">
                    Open
                  </option>
                  <option name="times" id="trading" value="false">
                    Closed
                  </option>
                </Form.Select>
              </Col>
              {!item.trading ? (
                <Col xs={9}>
                  <div>
                    <p>Closed</p>
                  </div>
                </Col>
              ) : (
                <Col xs={9}>
                  <Row className="time-row">
                    <Col xs={5} lg={4} className="p-0 text-center">
                      <TextField
                        name="times"
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
                    <Col xs={2} lg={1} id="to">
                      <p className="m-0">to</p>
                    </Col>
                    <Col xs={5} lg={4} className="p-0 text-center">
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
