import React, { useEffect } from "react";
import { Col, Container, FormControl, Row, Accordion } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import Product from "./Product";

import PDFDocumentProvider from "../BusinessPage/PDF/PDFDocumentProvider";
import PDFDocumentProducts from "../BusinessPage/PDF/PDFDocumentProducts";
import PDFDocumentRequest from "../BusinessPage/PDF/PDFDocumentRequest";

const ProductsSection = ({ data, profileData }) => {
  let windowWidth = window.innerWidth;

  const [filterData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("data props", searchQuery);
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);
  const getDate = new Date();
  const currentDate = getDate.toLocaleString();

  return (
    <>
      {windowWidth < 720 ? (
        <Container className="product-section">
          <hr />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BiShoppingBag className="mx-2" />
                PRODUCT LIST
              </Accordion.Header>
              <Accordion.Body>
                <Row style={{ height: "3rem", marginBottom: "2px" }}>
                  <Col xs={9}>
                    <TextField
                      id="product_search"
                      color="success"
                      label="Search Products"
                      type="search"
                      placeholder="Search catalog"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      fullWidth
                      size="small"
                      className="m-2"
                    />
                  </Col>
                  <Col xs={3}>
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
                <Row style={{ marginTop: "10px" }}>
                  {filterData &&
                    filterData.length > 0 &&
                    filterData.map((item) => (
                      <>
                        <Product product={item} index={item.id} />
                      </>
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ) : (
        <>
          <Container className="product-section">
            <p>
              <BiShoppingBag className="mx-2" />
              PRODUCT LIST
            </p>
            <Row>
              <Col>
                <TextField
                  id="product_search"
                  color="success"
                  label="Search Products"
                  type="search"
                  placeholder="Search catalog"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  size="small"
                  className="m-2"
                />

                <PDFDocumentRequest
                  profileData={profileData}
                  productData={data}
                  date={currentDate}
                />
              </Col>
            </Row>

            <Row>
              {filterData.length > 0 &&
                filterData.map((item) => (
                  <>
                    <Product product={item} index={item.id} />
                  </>
                ))}
            </Row>
            <hr />
          </Container>
        </>
      )}
    </>
  );
};

export default ProductsSection;
