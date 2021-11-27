import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import {
  TextField,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { fetchLoggedInUser } from "../../redux/users/userAction";

//////////////////////////////////////////////////////////////////////////////////////

const LoginModal = ({ handleClose, show }) => {
  const logged_status = useSelector((s) => s.helper.logged_status);
  const dispatch = useDispatch();
  let history = useHistory();
  const URL = process.env.REACT_APP_API_URL;

  const [loginDetails, setLoginDetails] = useState({
    email: "default@test.com",
    password: "1234",
  });

  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const handleChange = ({ target }) => {
    setLoginDetails({ ...loginDetails, [target.name]: target.value });
  };
  const details = {
    email: loginDetails.email,
    password: loginDetails.password,
  };
  const loginClient = () => {
    axios
      .post(`${URL}/auth/login`, details, { withCredentials: true })
      .then((res) => JSON.stringify(res))
      .then(dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true }))
      .then(handleClose())
      .then(history.push("/profile/me"))
      .catch(
        (error) =>
          console.log(error) &&
          dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false })
      );
  };
  const loginUser = () => {
    axios
      .post(`${URL}/auth/login`, details, { withCredentials: true })
      .then((res) => JSON.stringify(res))
      .then(dispatch({ type: "SET_LOGGEDIN_STATUS", payload: true }))
      .then(handleClose())
      .then(history.push("/business/me/dashboard"))
      .catch(
        (error) =>
          console.log(error) &&
          dispatch({ type: "SET_LOGGEDIN_STATUS", payload: false })
      );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3>Login</h3>
          <Form>
            <TextField
              required
              name="email"
              className="my-1"
              variant="standard"
              placeholder="Enter Your email used for login"
              label="Account Email"
              value={loginDetails.email}
              onChange={handleChange}
            />
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              label="password"
              name="pasword"
              id="password"
              type={vpassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {vpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={loginUser}
            type="submit"
            className="mt-5"
            variant="success"
          >
            Login As Bussines
          </Button>
          <Button
            onClick={loginClient}
            type="submit"
            className="mt-5"
            variant="success"
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
