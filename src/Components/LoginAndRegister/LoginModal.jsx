import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Modal, Button, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { timerSuccess } from "../../utils/sweetarlert.js";
//////////////////////////////////////////////////////////////////////////////////////

const LoginModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState(null);
  const [validated, setValidated] = useState(false);
  const vpassword = useSelector((s) => s.helper.password_visible);
  const modalStatus = useSelector((s) => s.helper.loginModal);
  const helper = useSelector((s) => s.helper);

  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const handleChange = ({ target }) => {
    setLoginValues({ ...loginValues, [target.name]: target.value });
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = async (loginDetails) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginDetails,
        {
          withCredentials: true,
        }
      );
      let data = resp.data;
      console.log(resp);
      // await dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });

      setValidationError(null);
      if (resp.data.role === "client") {
        timerSuccess(navigate, "/profile/me");
        dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
        dispatch({
          type: "SET_LOGIN_MODAL",
          payload: !helper.loginModal,
        });
      } else if (resp.data.role === "user") {
        timerSuccess(navigate, "/business/me");
        dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true });
        dispatch({
          type: "SET_LOGIN_MODAL",
          payload: !helper.loginModal,
        });
        // navigate("/business/me");
      } else {
        console.log("no role has been assigned to account");
        console.log("role", data);
      }
    } catch (error) {
      setValidationError(
        "The email and password you entered did not match our records. Please double check and try again"
      );
    }
  };

  return (
    <Modal show={modalStatus} onHide={handleClose}>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          className="m-2"
          onSubmit={formik.handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          {validationError ? (
            <p style={{ color: "red", textAlign: "center", fontWeight: "500" }}>
              {validationError}
            </p>
          ) : (
            ""
          )}
          <Button type="submit">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
