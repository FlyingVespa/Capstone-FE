import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

import { Button } from "@mui/material";
import { Row, Col, Modal, Form, FloatingLabel, Image } from "react-bootstrap";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const UpdateProductModal = ({
  handleUpdateModal,
  handleFormSubmit,
  fetchProducts,
  onChangeSetFormData,
  data,
}) => {
  const [validated, setValidated] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState("");

  const modalStatus = useSelector((s) => s.helper.updateProductModal);
  const user = useSelector((s) => s.users.user);

  const handleEdit = (productId, paypload, file) => {
    console.log("p", data);
    let formData = data;
    if (selectedFile) {
      formData = new FormData();
      formData.append("image", selectedFile);
    }
    updateProduct(productId, paypload, file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    };
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const updateProduct = async (productId, payload, file = null) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/business/${user._id}/products/${productId}`,
        payload
      );
      const productData = await response.data;

      if (file) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/business/${user._id}/products/${productId}/upload`,
          file
        );
        console.log(response);
        setFileInputState("");
        setPreviewSource("");

        setTimeout(() => {
          fetchProducts();
        }, 1000);
        handleUpdateModal();
      } else {
        setFileInputState("");
        setPreviewSource("");

        handleUpdateModal();
        setTimeout(() => {
          fetchProducts();
        }, 1000);
        console.log(productData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      size="lg"
      show={modalStatus}
      onHide={handleUpdateModal}
      className="updateModal"
    >
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
                  value={data.name}
                  onChange={onChangeSetFormData}
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
                  value={data.price}
                  onChange={onChangeSetFormData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <br />

          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Select Product Status">
                <Form.Select
                  onChange={onChangeSetFormData}
                  name="status"
                  defaultValue={data.status}
                >
                  <option disabled>Set stock level</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">low</option>
                  <option value="out-of-stock">Out Of Stock</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Select Product Units">
                <Form.Select
                  onChange={onChangeSetFormData}
                  name="units"
                  defaultValue={data.units}
                >
                  <option disabled>Units</option>
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
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Description">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={data.description}
                  onChange={onChangeSetFormData}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <br />
          <Row>
            {/* <Col id="modalImage"> */}
            <div id="dcontainer">
              <Image src={data.image} alt="image" id="image" />
              <div id="middle">
                <Button id="text">
                  <FaCamera />
                </Button>
              </div>
            </div>

            {/* </Col> */}
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
          onClick={() => handleEdit(data._id, data, fileInputState)}
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
