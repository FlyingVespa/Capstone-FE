import React, { useEffect } from "react";
import { Col, Container, FormControl, Row, Accordion } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import Product from "./Product";

import PDFDocumentProvider from "./PDF/PDFDocumentProvider";
import PDFDocumentProducts from "./PDF/PDFDocumentProducts";
import PDFDocumentRequest from "./PDF/PDFDocumentRequest";

const Products = ({ data, profileData }) => {
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
  const getDate = new Date();
  const currentDate = getDate.toLocaleString();

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
                <TextField
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FormControl
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Container>
                  <PDFDocumentRequest
                    className="justify-space-around center"
                    profileData={profileData}
                    productData={data}
                    date={currentDate}
                  />
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
            </p>
            <Row className="my-3 justify-content-between mx-1">
              <Col xs={12} md={7}>
                <TextField
                  fullWidth
                  color="success"
                  label="Search Products"
                  type="search"
                  variant="standard"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col xs={12} md={5}>
                {filterData &&
                  filterData !== undefined &&
                  filterData !== null && (
                    <PDFDocumentRequest
                      profileData={profileData}
                      productData={data}
                      date={currentDate}
                    />
                  )}
              </Col>
            </Row>

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
