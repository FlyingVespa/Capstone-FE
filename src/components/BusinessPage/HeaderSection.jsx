import React from "react";
import { Image, Container, Row, Col, Badge } from "react-bootstrap";
import logoImgPlaceholder from "../../assets/logo/shop.png";

function HeaderSection({ data }) {
  const { businessname, category } = data;

  let logoImg = data.img_logo ? data.img_logo : logoImgPlaceholder;

  let trading = data.tradingtimes;

  return (
    <div>
      <Container className="header">
        <Row>
          <Col>
            <div id="image-header-container">
              <Image src={logoImg} id="img-logo" />
            </div>
            <Col>
              <h2 className="text-businessname">{businessname}</h2>
              <span className="text-category">{category}</span>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeaderSection;
