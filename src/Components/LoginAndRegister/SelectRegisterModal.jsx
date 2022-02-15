import React from "react";
import { Button, Modal, Col, Row, Image, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import reg from "../../assets/images/register.gif";
function SelectRegisterModal({ handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((s) => s.helper.registerModal);

  const navigateToPage = (page) => {
    navigate(`/register/${page}`);
    handleClose();
  };

  return (
    <>
      <Modal show={modalStatus} onHide={handleClose} className="register-modal">
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <Image src={reg} />
            </Col>
            <Col xs={12} md={6}>
              <Container>
                <Row className="text-center">
                  <h1>Sign Up Now</h1>
                  <p className="my-5">
                    It's quick and easy. By creating an account your business
                    can be found more easily by customers
                  </p>
                </Row>
                <Row className="my-5">
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => navigateToPage("business")}
                    >
                      Register A Business
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => navigateToPage("client")}
                    >
                      Regsiter As Client
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SelectRegisterModal;
