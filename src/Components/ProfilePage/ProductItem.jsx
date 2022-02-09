import React from "react";
import { Col, Row } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { useState } from "react";

const ProductItem = ({ item, key }) => {
  // const onHover = (e) => {
  //   e.target.style.color = "blue";
  // };

  function handleMouseOver() {
    setTimeout(setMouseOver(true), 700);
  }
  function handleMouseOut() {
    setTimeout(setMouseOver(false), 3000);
  }
  const [mouseHover, setMouseOver] = useState(false);

  const { image, price, product } = item;

  return (
    <>
      <Col md={3} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="qwe">
          <Avatar
            key={key}
            src={image}
            className="product-item"
            sx={{ width: 56, height: 56 }}
          />
          <div className="product-item-container">
            {!mouseHover ? (
              <span>{product}</span>
            ) : (
              <>
                <span>$</span>
                <span>{price}</span>
              </>
            )}
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductItem;
