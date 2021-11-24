import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Draggable from "react-draggable";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
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

const AddProduct = ({ open, handleClose }) => {
  let history = useHistory();

  const currentUser = useParams.userId;
  const [product, setProduct] = useState({
    businessId: currentUser,
    businessId: "619784b3b990ee614a4e469c",
    product: "Ball",
    price: "1.99",
    units: "kg",
    status: "low",
    image: "http://placeimg.com/640/480/fashion",
  });

  const handleProductDetails = ({ target }) => {
    setProduct({ ...product, [target.name]: target.value });
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(
        `${URL}/business/${currentUser}/dashboard`,
        product
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

  const PaperComponent = (props) => {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add New Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            A product can only have one unique name, if product already exists
            update existing product
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="product"
            label="Product Name"
            fullWidth
            variant="standard"
          />
          <Row>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                name="price"
                label="Price"
                variant="standard"
                type="number"
              />
            </Col>
            <Col>
              <Autocomplete
                autoFocus
                margin="dense"
                variant="standard"
                options={units}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Units"
                    variant="standard"
                    margin="dense"
                  />
                )}
              />
            </Col>
          </Row>
          <TextField
            autoFocus
            margin="dense"
            name="image"
            label="Image"
            variant="standard"
          />
          <Autocomplete
            autoFocus
            margin="dense"
            variant="standard"
            options={status}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                variant="standard"
                margin="dense"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addProduct}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
