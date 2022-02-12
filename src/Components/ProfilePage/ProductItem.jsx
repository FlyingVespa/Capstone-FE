import React from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
const ProductItem = ({ data }) => {
  function handleMouseOver() {
    setTimeout(setMouseOver(true), 700);
  }
  function handleMouseOut() {
    setTimeout(setMouseOver(false), 3000);
  }
  const [mouseHover, setMouseOver] = useState(false);

  return (
    <>
      <Container>
        <p>
          <BiShoppingBag className="mx-2" />
          PRODUCT LIST
        </p>
        <FormControl type="text" placeholder="Search products" className="" />
        <Row>
          {data &&
            data.map((item, i) => (
              <Col
                key={i}
                xs={6}
                sm={6}
                md={4}
                xl={3}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <div className="product-container">
                  <Avatar
                    key={i}
                    src={item.image}
                    className="avatar-product"
                    sx={{ width: 56, height: 56 }}
                  />
                  <div className="product-item">
                    {!mouseHover ? (
                      <span key={i}>{item.product}</span>
                    ) : (
                      <>
                        <span key={i}>$</span>
                        <span key={i}>{item.price}</span>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductItem;
