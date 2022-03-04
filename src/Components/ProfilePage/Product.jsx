import React, { useEffect } from "react";
import { Col, Image } from "react-bootstrap";
// import { Image } from "@mui/material";

function Product({
  product,
  index,
  handleMouseOver,
  handleMouseOut,
  mouseHover,
}) {
  const checkStockLevel = () => {
    switch (product.status) {
      case "medium":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product medium"
          />
        );
      case "low":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product low"
          />
        );
      case "high":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product high"
          />
        );
      case "out-of-stock":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product out-of-stock"
          />
        );
      default:
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product medium"
          />
        );
    }
  };

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
        {/* <Image key={index} src={product.image} className="avatar-product" /> */}
        {checkStockLevel()}

        <div className="product-item">
          <span key={index}>{product.product}</span>
          <span key={index}>---</span>
          <span key={index}>$ {product.price}</span>
        </div>
      </div>
    </Col>
  );
}

export default Product;
