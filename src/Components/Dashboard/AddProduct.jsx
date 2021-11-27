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
const URL = process.env.REACT_APP_API_URL;

const AddProduct = ({ handleClose, open }) => {
  let history = useHistory();
  let location = useLocation();
  let params = useParams();

  const user = useSelector((state) => state.users.loggedUser);
  const [product, setProduct] = useState({
    
    product: "Ball",
    price: "1.99",
    units: "kg",
    status: "low",
    amount: "500",
    image: "http://placeimg.com/640/480/fashion",
  });

  const handleProductDetails = ({ target }) => {
    setProduct({ ...product, [target.name]: target.value });
  };

  // var config = {
  //   method: "post",
  //   url: "http://localhost:4546/business/618fabc53312253c0925e479/products",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: product,
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });"
  // const userId = useParams.userId;
  // const checkUserId = () => {
  //   if (userId === "me") {
  //   }
  // };

  const addProduct = async () => {
    // axios
    //   .post(`http://localhost:4546/business/${user.data._id}/products`, product)
    //   .then((res) => JSON.stringify(res.data))
    //   .then(handleClose())
    //   .then(console.log(user.data._id))
    //   .then(
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Your work has been saved",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     })
    //   )
    //   .catch(
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "error",
    //       title: "Could not add product, please try again",
    //       showConfirmButton: false,
    //       timer: 2500,
    //     })
    //   );

    try {
      const response = await axios.post(
        `${URL}/business/${user._id}/products`,
        product,
        { withCredentials: true }
      );
      if (response.ok) {
        const productData = response.json();
        console.log(productData);
        Swal.fire(
          "Product Added Sucessfully!",
          "It will apprear momentarily",
          "success"
        );
      } else {
        console.log("something went wrong when posting data");
      }
    } catch (err) {
      if (err) {
        Swal.fire(
          "Oops!",
          "Registration failed, either email already exist or details missing/not entered correctly, please try again.",
          "error"
        );
      } else if (err.status === 500) {
        Swal.fire("Oops!, please try again in a bit.", "error");
      } else if (err.status === 404) {
        Swal.fire(
          "Oops!, Could not find this email linked to any accounts. Please continue to register.",
          "error"
        );
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addProduct}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
