import { useSelector } from "react-redux";
import { useState } from "react";

import { Button } from "@mui/material";
import { Row, Col, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateProductModal = ({
  handleUpdateModal,
  data,
  onChange,
  handleFormSubmit,
  fileChangedHandler,
  previewSource,
}) => {
  const { name, price, description } = data;
  const [validated, setValidated] = useState(false);
  const modalStatus = useSelector((s) => s.helper.updateProductModal);

  return (
    <Modal size="lg" show={modalStatus} onHide={handleUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Product">
                <Form.Control
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Price">
                <Form.Control
                  name="price"
                  type="number"
                  placeholder="1.99"
                  step=".01"
                  value={price}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <br />
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Description">
                <Form.Control
                  name="description"
                  type="text"
                  value={description}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <br />
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Select Product Status">
                <Form.Select onChange={onChange} name="status">
                  <option selected disabled>
                    Set stock level
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">low</option>
                  <option value="out-of-stock">Out Of Stock</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Select Product Units">
                <Form.Select onChange={onChange} name="units">
                  <option selected disabled>
                    Units
                  </option>
                  <option value="ea">Each</option>
                  <option value="ml">Mililiter</option>
                  <option value="cl">Centiliter</option>
                  <option value="l">Liter</option>
                  <option value="mm">milimeter</option>
                  <option value="cm">centimeter</option>
                  <option value="m">meter</option>
                  <option value="g">Gram</option>
                  <option value="kg">Kilogram</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={fileChangedHandler} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="All product info is correct"
              feedback="You must confirm before updating."
              feedbackType="invalid"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateModal} className="mx-1">
          Cancel
        </Button>
        <Button
          onClick={() => handleFormSubmit()}
          className="mx-1"
          variant="contained"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProductModal;
