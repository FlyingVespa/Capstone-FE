import React, { useEffect } from "react";
import { Col, Container, FormControl, Row, Accordion } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";

import Product from "./Product";

const Products = ({ data }) => {
  let windowWidth = window.innerWidth;

  const [filterData, setFilteredData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("data props", searchQuery);
    setFilteredData(
      data.filter((item) =>
        item.product.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  return (
    <>
      {windowWidth < 720 ? (
        <Container>
          <hr />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BiShoppingBag className="mx-2" />
                PRODUCT LIST{" "}
                <FormControl
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  {filterData &&
                    filterData.length > 0 &&
                    filterData.map((item) => (
                      <Product product={item} index={item.id} />
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
            </p>{" "}
            <FormControl
              className="m-2 "
              placeholder=" 🔍 Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Row>
              {filterData &&
                filterData.length > 0 &&
                filterData.map((item) => (
                  <>
                    <Product product={item} index={item.id} />
                  </>
                ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Products;
