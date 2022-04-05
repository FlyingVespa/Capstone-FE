import { useState } from "react";
import { Col, Image } from "react-bootstrap";
// import { Image } from "@mui/material";
import ProductDetailsModal from "./ProductDetailsModal";
function Product({ product, index }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkStockLevel = () => {
    switch (product.status) {
      case "medium":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product medium"
            alt={product.name}
          />
        );
      case "low":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product low"
          />
        );
      case "high":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product high"
            onClick={handleShow}
          />
        );
      case "out-of-stock":
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product out-of-stock"
          />
        );
      default:
        return (
          <Image
            key={index}
            src={product.image}
            className="avatar-product medium"
          />
        );
    }
  };
  if (product !== undefined && product !== null) {
    checkStockLevel();
  }

  return (
    <>
      <Col xs={12} sm={6} md={4} xl={3}>
        <div className="product-container" key={index} onClick={handleShow}>
          {checkStockLevel()}

          {/* <Image key={index} src={product.image} id="avatar-product" /> */}

          <div className="product-item">
            <Col xs={8}>
              <span>{product.name}</span>
            </Col>
            <Col xs={1}>
              <span>-</span>
            </Col>
            <Col xs={3}>
              {product.status === "out-of-stock" ? (
                <span>out of stock</span>
              ) : (
                <span>$ {product.price}</span>
              )}
            </Col>
          </div>
        </div>
      </Col>
      <ProductDetailsModal
        show={show}
        handleClose={handleClose}
        product={product}
      />
    </>
  );
}

export default Product;
