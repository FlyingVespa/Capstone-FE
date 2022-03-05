import React from "react";
import { Modal, Image, Col } from "react-bootstrap";

function ProductDetailsModal({ show, handleClose, product }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.product}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Image src={product.image} />

          <p>{product.desc}</p>
          <p>{product.price}</p>
          <p>{product.units}</p>
          <p>{product.amount}</p>
        </Col>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetailsModal;
