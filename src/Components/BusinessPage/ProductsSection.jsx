// libraries
import React, { useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// styling
import {
  Col,
  Container,
  FormControl,
  Row,
  Accordion,
  Button,
} from "react-bootstrap";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
// components
import Product from "./Product";
import PDFDocumentRequest from "../BusinessPage/PDF/PDFDocumentRequest";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

const ProductsSection = ({ data }) => {
  let params = useParams();
  let windowWidth = window.innerWidth;
  const [filterData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const loggedin = useSelector((s) => s.helper.loggedin);
  const PROFILE_ID = data._id;
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/business/${PROFILE_ID}/products`
      );
      let data = await res.data;
      await setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const filterProducts = () => {
    if (products.length > 0) {
      setFilteredData(
        products.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    filterProducts();
    console.log("fff", filterData);
  }, [searchQuery, products]);

  return (
    <>
      {/* {windowWidth < 720 ? (
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
                      filterData !== null && <PDFDocumentRequest data={data} />}
                  </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  {filterData &&
                    filterData.length > 0 &&
                    filterData.map((item) => (
                      <>
                        <Product product={item} index={item._id} />
                      </>
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ) : ( */}
      <>
        <Container className="product-section">
          <p>
            <BiShoppingBag className="mx-2" />
            PRODUCT LIST
          </p>

          {products.length > 0 ? (
            <>
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
                    className="mx-1 my-3"
                  />
                  <PDFDocumentRequest data={data} products={products} />
                </Col>
              </Row>
              <Row>
                {filterData.length > 0 ? (
                  filterData.map((item, i) => (
                    <>
                      <Product product={item} index={item.id} key={i + item} />{" "}
                    </>
                  ))
                ) : (
                  <Col
                    style={{
                      alignItems: "center",
                      paddingLeft: "8px",
                    }}
                  >
                    <Link
                      to="/business/me/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outline-secondary"
                        style={{
                          height: "3rem",
                          // width: "3rem",
                          fontSize: "large",
                          border: "3px solid grey",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Add Products <AddIcon />
                      </Button>
                    </Link>
                  </Col>
                )}
                <Col
                  style={{
                    display: "flex",

                    alignItems: "center",
                  }}
                ></Col>
              </Row>
            </>
          ) : (
            <Row>
              {loggedin ? (
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to="/business/me/dashboard"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="outline-secondary"
                      style={{
                        height: "3rem",
                        fontSize: "large",
                        border: "3px solid grey",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Add Products <AddIcon />
                    </Button>
                  </Link>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          )}
          <hr />
        </Container>
      </>
      {/* )} */}
    </>
  );
};

export default ProductsSection;
