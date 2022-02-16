import React from "react";
import { Button, Modal, Col, Row, Image, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import reg from "../../assets/images/register.gif";

import "./LoginRegistration.css";
function SelectRegisterModal({ handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalStatus = useSelector((s) => s.helper.registerModal);
  const registerType = useSelector((s) => s.helper.register);

  const handleRegisterType = (type) => {
    dispatch({ type: "SET_REGISTER", payload: type });
    navigate(`/register`);
    handleClose();
  };

  return (
    <>
      <Modal
        show={modalStatus}
        id="registerModal"
        fullscreen={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <Image src={reg} />
            </Col>
            <Col xs={12} md={6}>
              <Container className="p-1">
                <Row className="text-center">
                  <h1>Create An Account Today</h1>
                  <p className="my-3">
                    It's quick and easy. By creating an account your business
                    can be found more easily by customers.
                  </p>
                </Row>
                <Row className="my-5">
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => handleRegisterType("business")}
                    >
                      Register Business Account
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => handleRegisterType("client")}
                    >
                      Register Client Account
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
