// Library
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Styling
import { Image, Container, Row, Col, Badge } from "react-bootstrap";

import logoImgPlaceholder from "../../assets/logo/shop.png";
// Components

function HeaderSection({ data }) {
  const { businessname, category } = data;

  let logoImg = data.img_logo ? data.img_logo : logoImgPlaceholder;

  let trading = data.tradingtimes;

  const tradingStatus = useSelector((s) => s.users.storeTradingStatus);

  return (
    <div className="header">
      <Row>
        <Col>
          <div id="image-header-container">
            <Image src={logoImg} id="img-logo" />
          </div>
          <Col>
            <h2 className="text-businessname">{businessname}</h2>
            <hr className="my-1" />
            <span className="text-category">{category}</span>
            <span className="mx-1 opacity-50">•</span>
            <span>
              {tradingStatus ? (
                <Badge bg="success" className="mx-2">
                  open
                </Badge>
              ) : (
                <Badge bg="danger" className="mx-2">
                  closed
                </Badge>
              )}
            </span>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderSection;
