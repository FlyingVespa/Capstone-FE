import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { Row, Col, Modal, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";

const AddProductModal = ({
  handleAddModal,
  handleFormSubmit,
  fetchProducts,
}) => {
  let params = useParams();
  let dispatch = useDispatch();
  // const { name, price, description } = data;
  const modalStatus = useSelector((s) => s.helper.addProductModal);
  const user = useSelector((s) => s.users.user);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");

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
  const onChangeSetFormData = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    console.log(target.value);
  };
  const handlePost = () => {
    let formData = null;
    if (selectedFile) {
      formData = new FormData();
      formData.append("image", selectedFile);
    }
    addProduct(data, formData);
  };
  const addProduct = async (textPayload, imgPayload = null) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/business/${user._id}/products`,
        textPayload
      );
      let data = await res.data;

      console.log("product no img", data);
      if (imgPayload) {
        let imgResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/business/${user._id}/products/${res.data._id}/upload`,
          imgPayload
        );
        console.log(imgResponse);
        setFileInputState("");
        setPreviewSource("");
        setData("");
        setTimeout(() => {
          fetchProducts();
        }, 1000);
        handleAddModal();
      } else {
        setFileInputState("");
        setPreviewSource("");
        setData("");
        handleAddModal();
        setTimeout(() => {
          fetchProducts();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="lg" show={modalStatus} onHide={handleAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Product">
                <Form.Control
                  name="name"
                  type="text"
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
              <FloatingLabel label="Description">
                <Form.Control
                  name="description"
                  type="text"
                  value={data.description}
                  onChange={onChangeSetFormData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <br />
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="Select Product Status">
                <Form.Select onChange={onChangeSetFormData} name="status">
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
                <Form.Select onChange={onChangeSetFormData} name="units">
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
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
              />
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              )}
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="All product info is correct"
              feedback="You must confirm before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddModal} className="mx-1">
          Cancel
        </Button>
        <Button
          onClick={() => handlePost(data, fileInputState)}
          className="mx-1"
          variant="contained"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
