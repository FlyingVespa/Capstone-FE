import React from "react";
import { Col, Container, FormControl, Row, Accordion } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";

import Product from "./Product";

const Products = ({ data }) => {
  function handleMouseOver() {
    setTimeout(setMouseOver(true), 700);
  }
  function handleMouseOut() {
    setTimeout(setMouseOver(false), 3000);
  }
  const [mouseHover, setMouseOver] = useState(false);
  let windowWidth = window.innerWidth;

  const [filterData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("a");

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = data.filter((d) => {
      return d.product.search(value) != -1;
    });
    setFilteredData(result);
  };

  return (
    <>
      {windowWidth < 720 ? (
        <Container>
          <hr />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BiShoppingBag className="mx-2" />
                PRODUCT LIST
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <FormControl
                    type="text"
                    placeholder="Search products"
                    className=""
                    value={searchQuery}
                    onChange={handleSearch}
                  />

                  {data &&
                    data.map((item, i) => (
                      <Product
                        product={item}
                        index={i}
                        mouseHover={mouseHover}
                        handleMouseOver={handleMouseOver}
                        handleMouseOut={handleMouseOut}
                      />
                    ))}
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ) : (
        <Container>
          <p>
            <BiShoppingBag className="mx-2" />
            PRODUCT LIST
          </p>
          <Container>
            <FormControl
              type="text"
              placeholder=" 🔍 Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Container>
          <Row>
            {data &&
              data
                // .filter(searchQuery)
                .map((item, i) => (
                  <Product
                    product={item}
                    index={i}
                    mouseHover={mouseHover}
                    handleMouseOver={handleMouseOver}
                    handleMouseOut={handleMouseOut}
                  />
                ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Products;
