import { useState, Component } from "react";
import {
  FormControl,
  Checkbox,
  TextField,
  FormLabel,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";

const TradingHoursDetails = ({ d, f, days, key, c }) => {
  const inputLProps = { shrink: true };
  const inputProps = { step: 300 };
  return (
    <div>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Trading Days Open/Closed</FormLabel>
        <FormGroup>
          {days.map((day) => (
            <Row>
              <Col xs={4}>
                <FormControlLabel
                  label={day}
                  // id="trading"
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
                  <Row>
                    <Col xs={5}>
                      <TextField
                        name={day}
                        variant="standard"
                        id="open"
                        label="open"
                        type="time"
                        value={d[day].open}
                        InputLabelProps={inputLProps}
                        inputProps={inputProps}
                        fullWidth
                        onChange={f}
                      />
                    </Col>
                    <Col xs={1}>to</Col>
                    <Col xs={5}>
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
                        fullWidth
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
// {days.map((day) => (
//   <Row>
//     <Col xs={5}>
//       <FormControlLabel
//         label={day}
//         control={
//           <Checkbox
//             id="times"
//             key={day}
//             name="trading"
//             checked={d[day].trading}
//             onChange={c}
//             // onChange={(e) =>
//             //   setTimes({
//             //     ...times,
//             //     [day]: {
//             //       ...times[day],
//             //       trading: e.target.checked,
//             //     },
//             //   })
//             // }
//           />
//         }
//       />
//     </Col>
//     {!d[day].trading ? (
//       <Col xs={7}>
//         <div>
//           <p>Closed</p>
//         </div>
//       </Col>
//     ) : (
//       <Col xs={7}>
//         <Row>
//           <Col xs={5}>
//             <TextField
//               id={day}
//               name="open"
//               variant="standard"
//               label="open"
//               type="time"
//               value={d[day].open}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               inputProps={{
//                 step: 300, // 5 min
//               }}
//               fullWidth
//               onChange={f}
//               // onChange={(e) =>
//               //   setTimes({
//               //     ...times,
//               //     [day]: {
//               //       ...times[day],
//               //       open: e.target.value,
//               //     },
//               //   })
//               // }
//             />
//           </Col>
//           <Col xs={1}>to</Col>
//           <Col xs={5}>
//             <TextField
//               name="close"
//               variant="standard"
//               label="close"
//               type="time"
//               value={d[day].closed}
//               onChange={f}
//               // onChange={(e) =>
//               //   setTimes({
//               //     ...times,
//               //     [day]: {
//               //       ...times[day],
//               //       closed: e.target.value,
//               //     },
//               //   })
//               // }
//               defaultValue="17:00"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               inputProps={{
//                 step: 300, // 5 min
//               }}
//               fullWidth
//             />
//           </Col>
//         </Row>
//       </Col>
//     )}
//   </Row>
// ))}
