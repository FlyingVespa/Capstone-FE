import React from "react";
import { Modal, Image, Col, Row, CloseButton } from "react-bootstrap";

function ProductDetailsModal({ show, handleClose, product }) {
  const s = {
    width: "250px",
    // height: "300px",
    objectFit: "cover",
    // border: "1px solid red",
  };

  return (
    <Modal show={show} onHide={handleClose} className="product-details-modal">
      <Row>
        <Image src={product.image} style={s} />

        <Col>
          <CloseButton onClick={handleClose} className="float-end m-2" />
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
