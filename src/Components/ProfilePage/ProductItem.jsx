import React from "react";
import { Col, Row } from "react-bootstrap";

const ProductItem = ({ item, key }) => {
  const onHover = (e) => {
    e.target.style.color = "blue";
  };

  return (
    <>
      {/* <Col> */}
      {
        <div key={key} className="product-item" onFocus={onHover}>
          <img src={item.image}></img>
          <p>{item.product}</p>
        </div>
      }
      {/* </Col> */}
    </>
  );
};

export default ProductItem;
