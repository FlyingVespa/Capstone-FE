import { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { TiThListOutline } from "react-icons/ti";
import "./profilepage.css";
import StockListModal from "./StockListModal";
function StockList({ promo }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <p>
            <TiThListOutline /> STOCKLIST
          </p>
        </Col>
        <Col>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            See All Stock
          </Button>
        </Col>
      </Row>

      <Container className="stocklist">
        <Row>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} xs={6} className="m-0 p-0 stock-item-container">
            <Image className="stock-item-img" src={promo.img_user} />
            <div class="stock-item-overlay">
              <div class="stock-item">
                <p className="p-0 m-0">Carrots</p>
                <p className="p-0 m-0">$ 20</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <StockListModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default StockList;
