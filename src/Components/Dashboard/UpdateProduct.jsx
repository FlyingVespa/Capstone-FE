import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";

const units = [
  { label: "Kilogram", value: "kg" },
  { label: "Each", value: "ea" },
  { label: "Gram", value: "g" },
  { label: "Liter", value: "ℓ" },
  { label: "Milliliter", value: "mℓ" },
  { label: "Millimeter", value: "mm" },
  { label: "Centimeter", value: "cm" },
  { label: "Meter", value: "m" },
];

const status = [
  { label: "High" },
  { label: "Medium" },
  { label: "Low" },
  { label: "Out-of-Stock" },
];

const UpdateProduct = ({
  handleUpdateModalClose,
  openUpdateProductModal,
  getProductData,
}) => {
  const URL = process.env.REACT_APP_API_URL;
  let history = useHistory();
  let location = useLocation();
  let params = useParams();

  const loggedUser = useSelector((s) => s.users.loggedUser);
  const [product, setProduct] = useState({});

  const handleProductDetails = ({ target }) => {
    setProduct({ ...product, [target.name]: target.value });
  };
  const userId = loggedUser._id;

  const handleProductUpdate = (productId) => {
    axios
      .put(`${URL}/business/${userId}/products/${productId}`, product)
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog open={openUpdateProductModal} onClose={handleUpdateModalClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A product can only have one unique name, if product already exists
            update existing product
          </DialogContentText>
          <TextField
            margin="dense"
            name="product"
            label="Product Name"
            variant="standard"
            value={product.product}
            onChange={handleProductDetails}
          />
          <Row>
            <Col>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                variant="standard"
                type="number"
                value={product.price}
                onChange={handleProductDetails}
              />
            </Col>
            <Col>
              <Autocomplete
                name="untis"
                margin="dense"
                variant="standard"
                options={units}
                value={product.units}
                onChange={handleProductDetails}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="untis"
                    label="Units"
                    variant="standard"
                    margin="dense"
                    onChange={handleProductDetails}
                  />
                )}
              />
            </Col>
          </Row>
          <TextField
            margin="dense"
            name="image"
            label="Image"
            variant="standard"
            value={product.image}
            onChange={handleProductDetails}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            variant="standard"
            value={product.amount}
            onChange={handleProductDetails}
          />
          <Autocomplete
            name="status"
            margin="dense"
            variant="standard"
            onChange={handleProductDetails}
            options={status}
            renderInput={(params) => (
              <TextField
                {...params}
                name="status"
                label="Status"
                variant="standard"
                margin="dense"
                value={product.status}
                onChange={handleProductDetails}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateModalClose}>Cancel</Button>
          <Button onClick={handleProductUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateProduct;
