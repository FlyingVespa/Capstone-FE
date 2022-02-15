import React, { useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = data.filter((d) => {
      return d.product.search(value) != -1;
    });
    console.log(value);
    setFilteredData(result);
  };
  useEffect(() => {
    console.log("data props", data);
  }, []);
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

                  {filterData &&
                    filterData.length > 0 &&
                    filterData.map((item, i) => (
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
        <>
          <Container>
            <hr />
            <p>
              <BiShoppingBag className="mx-2" />
              PRODUCT LIST
            </p>
            <Container>
              <FormControl
                type="text"
                placeholder=" 🔍 Search products..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </Container>
            <Row>
              {filterData &&
                filterData.length > 0 &&
                filterData.map((item, i) => (
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
        </>
      )}
    </>
  );
};

export default Products;
