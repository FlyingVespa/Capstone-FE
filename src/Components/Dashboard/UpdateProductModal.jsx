// import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useLocation, useParams } from "react-router-dom";

// import Swal from "sweetalert2";
// import axios from "axios";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  ListSubheader,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";

const AddUpdateProductModal = ({
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  fileChangedHandler,
  previewSource

}) => {
  const { product, price, amount, units, status, image, id } = data;

  const modalStatus = useSelector((s) => s.helper.productModal);

 
  return (
    <div>
      <Dialog open={modalStatus} onClose={handleClose}>
        <DialogTitle>
          {"Update Product Details" }
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
            name="amount"
            label="Amount"
            variant="standard"
            value={amount}
            onChange={onChange}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Stock Level</InputLabel>
            <Select value={status ?? ""} onChange={onChange} name="status">
              <MenuItem>
                <em disabled>None</em>
              </MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"low"}>low</MenuItem>
              <MenuItem value={"out-of-stock"}>Out Of Stock</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Units</InputLabel>
            <Select value={units ?? ""} onChange={onChange} name="units">
              <MenuItem>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ea"}>Each</MenuItem>
              {/* <ListSubheader>Volume</ListSubheader> */}
              <MenuItem value={"ml"}>Mililiter</MenuItem>
              <MenuItem value={"cl"}>Centiliter</MenuItem>
              <MenuItem value={"l"}></MenuItem>
              {/* <ListSubheader>Weight</ListSubheader> */}
              <MenuItem value={"g"}>Gram</MenuItem>
              <MenuItem value={"kg"}>Kilogram</MenuItem>
              {/* <ListSubheader>Length</ListSubheader> */}
              <MenuItem value={"mm"}>milimeter</MenuItem>
              <MenuItem value={"cm"}>centimeter</MenuItem>
              <MenuItem value={"m"}>meter</MenuItem>
            </Select>
          </FormControl>
          <div>
            <h1 className="title">Upload an Image</h1>
       
            <input type="file" onChange={fileChangedHandler}/>
          
{/*            
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            )} */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {"Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUpdateProductModal;
