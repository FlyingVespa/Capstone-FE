import React from "react";
import { Modal, Image, Col, Row } from "react-bootstrap";

function ProductDetailsModal({ show, handleClose, product }) {
  return (
    <Modal show={show} onHide={handleClose} className="product-details-modal">
      <Row id="">
        <Col>
          <Image src={product.image} />
        </Col>
        <Col>
          <Row>
            <h4>{product.name}</h4>
          </Row>
          <Row>
            <p>{product.description}</p>
          </Row>
          <Row>
            <span>{product.price}</span>
            <span>{product.units}</span>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default ProductDetailsModal;
