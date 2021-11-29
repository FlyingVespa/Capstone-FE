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
  TextField,
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  ListSubheader,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";

const AddUpdateProductModal = ({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) => {
  const { product, price, amount, units, status, image, id } = data;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {id ? "Update Product Details" : "Add A New Product"}
        </DialogTitle>
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
            value={product}
            onChange={onChange}
          />
          <Row>
            <Col>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                variant="standard"
                type="number"
                value={price}
                onChange={onChange}
              />
            </Col>
            <Col></Col>
          </Row>
          <TextField
            margin="dense"
            name="image"
            label="Image"
            variant="standard"
            value={image}
            onChange={onChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            variant="standard"
            value={amount}
            onChange={onChange}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Stock Level</InputLabel>
            <Select value={status} onChange={onChange} name="status">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"low"}>low</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Units</InputLabel>
            <Select value={units} onChange={onChange} name="units">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ea"}>Each</MenuItem>
              <ListSubheader>Volume</ListSubheader>
              <MenuItem value={"ml"}>Mililiter</MenuItem>
              <MenuItem value={"cl"}>Centiliter</MenuItem>
              <MenuItem value={"l"}></MenuItem>
              <ListSubheader>Weight</ListSubheader>
              <MenuItem value={"g"}>Gram</MenuItem>
              <MenuItem value={"kg"}>Kilogram</MenuItem>
              <ListSubheader>Length</ListSubheader>
              <MenuItem value={"mm"}>milimeter</MenuItem>
              <MenuItem value={"cm"}>centimeter</MenuItem>
              <MenuItem value={"m"}>meter</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUpdateProductModal;