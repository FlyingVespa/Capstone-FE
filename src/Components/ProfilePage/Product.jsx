import React from "react";
import { Col, Image } from "react-bootstrap";
// import { Image } from "@mui/material";

function Product({
  product,
  index,
  handleMouseOver,
  handleMouseOut,
  mouseHover,
}) {
  return (
    <Col
      key={index}
      xs={12}
      sm={6}
      md={4}
      xl={3}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="product-container">
        <Image
          key={index}
          src={product.image}
          className="avatar-product"
          sx={{ width: 56, height: 56 }}
        />
        <div className="product-item">
          {!mouseHover ? (
            <span key={index}>{product.product}</span>
          ) : (
            <>
              <span key={index}>$</span>
              <span key={index}>{product.price}</span>
            </>
          )}
        </div>
      </div>
    </Col>
  );
}

export default Product;
