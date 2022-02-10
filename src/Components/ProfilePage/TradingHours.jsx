import React from "react";
import { Container } from "react-bootstrap";

function TradingHours({ data }) {
  if (data !== undefined && data !== null) {
    // const tradinghours = Object.keys(data?.times);
  }

  return (
    <Container>
      <h1>Trading Hours</h1>

      {/* {tradinghours !== undefined ? <p>open</p> : <p>loading</p>} */}

      {/* </ul> */}
    </Container>
  );
}

export default TradingHours;
