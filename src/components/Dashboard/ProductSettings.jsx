// libraries
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// styling
import { Container, Table, Button, Form, ButtonGroup } from "react-bootstrap";
// components
import ProductSettingsItem from "./ProductSettingsItem";
import {
  getProductData,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../network/lib/products";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import { FormControl } from "@mui/material";

const ProductSettings = ({ userData }) => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((s) => s.users.user);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/business/${user._id}/products`
      );
      await setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const checkStock = () => {};
  useEffect(() => {
    checkStock();
  });

  return (
    <>
      <Container
        className="m-5 p-4"
        style={{ backgroundColor: "#fff", borderRadius: "15px" }}
      >
        <Button> Add Product</Button>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Description</Button>
          <Button variant="secondary">Product</Button>
          <Button variant="secondary">Stock Level</Button>
        </ButtonGroup>
        <Form.Control />
        {products && !loading && (
          <Table responsive hover className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Units</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock Level</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <ProductSettingsItem item={item} index={index} />
              ))}
              <td></td>
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};
export default ProductSettings;
