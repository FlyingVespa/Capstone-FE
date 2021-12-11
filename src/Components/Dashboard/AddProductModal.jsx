import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  ListSubheader,
} from "@mui/material";
import {
  Row,
  Col,
  Modal,
  Form,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";

const AddProductModal = ({
  handleAddModal,
  data,
  onChange,
  handleFormSubmit,
  fileChangedHandler,
  previewSource,
}) => {
  const { product, price, desc, units, status, image, id } = data;
  const modalStatus = useSelector((s) => s.helper.addProductModal);
  const [validated, setValidated] = useState(false);

  return (
    <Modal
      size="sm"
      show={modalStatus}
      onHide={handleAddModal}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Product">
                <Form.Control
                  name="product"
                  type="text"
                  placeholder="name@example.com"
                  value={product}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              {" "}
              <FloatingLabel label="Price">
                <Form.Control
                  name="price"
                  type="text"
                  placeholder="name@example.com"
                  value={price}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Description">
                <Form.Control
                  name="product"
                  type="text"
                  value={desc}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
            <Col md></Col>
          </Row>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Works with selects">
                <Form.Select aria-label="Floating label select example">
                  <option value={"high"}>High</option>
                  <option value={"medium"}>Medium</option>
                  <option value={"low"}>low</option>
                  <option value={"none"}>Out Of Stock</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Works with selects">
                <Form.Select aria-label="Floating label select example">
                  <option value={"ea"}>Each</option>
                  <option value={"ml"}>Mililiter</option>
                  <option value={"cl"}>Centiliter</option>
                  <option value={"l"}></option>
                  <option value={"g"}>Gram</option>
                  <option value={"kg"}>Kilogram</option>
                  <option value={"mm"}>milimeter</option>
                  <option value={"cm"}>centimeter</option>
                  <option value={"m"}>meter</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col></Col>
          </Row>
          <TextField
            margin="dense"
            name="desc"
            label="Description"
            variant="standard"
            required={true}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Stock Level</InputLabel>
            <Select value={status} onChange={onChange} name="status">
              <MenuItem value={"high"}>High</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"low"}>low</MenuItem>
              <MenuItem value={"none"}>Out Of Stock</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Units</InputLabel>
            <Select value={units} onChange={onChange} name="units">
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

          <Form.Control type="file" onChange={fileChangedHandler} />

          <input type="file" onChange={fileChangedHandler} />

          <Button onClick={handleAddModal}>Cancel</Button>
          <Button
            color="primary"
            onClick={handleFormSubmit}
            variant="contained"
          >
            Submit
          </Button>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
