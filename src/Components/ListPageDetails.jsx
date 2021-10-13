import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import p0 from "../p2.png";
import p1 from "../p1.png";
import p2 from "../p3.png";
import p3 from "../p4.png";
// import p4 from "../pngegg(4).png";
function ListPageDetails() {
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Image scr={p0} />
          </Row>
          <Row>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus autem corrupti expedita provident atque assumenda
              animi consequatur ipsum! Ullam dolores tempore, cupiditate quae
              cumque dolorum quaerat alias nesciunt accusamus reprehenderit.
            </p>
          </Row>
        </Col>
        <Col>
          <Row>
            <Image scr={p1} />
          </Row>
          <Row>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus autem corrupti expedita provident atque assumenda
              animi consequatur ipsum! Ullam dolores tempore, cupiditate quae
              cumque dolorum quaerat alias nesciunt accusamus reprehenderit.
            </p>
          </Row>
        </Col>
        <Col>
          <Row>
            <Image scr={p2} />
          </Row>
          <Row>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus autem corrupti expedita provident atque assumenda
              animi consequatur ipsum! Ullam dolores tempore, cupiditate quae
              cumque dolorum quaerat alias nesciunt accusamus reprehenderit.
            </p>
          </Row>
        </Col>
        <Col>
          <Row>
            <Image scr={p3} />
          </Row>
          <Row>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus autem corrupti expedita provident atque assumenda
              animi consequatur ipsum! Ullam dolores tempore, cupiditate quae
              cumque dolorum quaerat alias nesciunt accusamus reprehenderit.
            </p>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ListPageDetails;
