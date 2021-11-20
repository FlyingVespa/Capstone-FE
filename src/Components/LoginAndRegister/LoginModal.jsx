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

const LoginModal = ({ handleClose, show }) => {
  let history = useHistory();
  const URL = process.env.REACT_APP_API_URL;

  const [loginDetails, setLoginDetails] = useState({
    email: "default@test.com",
    password: "1234",
  });

  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const handleChange = ({ target }) => {
    setLoginDetails({ ...loginDetails, [target.name]: target.value });
  };

  const tryLogin = async () => {
    try {
      const response = await axios.post(
        `${URL}/auth/login`,
        { email: loginDetails.email, password: loginDetails.password },
        {
          withCredentials: true,
        }
      );
      if (response.ok) {
        const data = response.data;
        console.log(data);
      }
    } catch (error) {}

    // .then((response) => {
    //   JSON.stringify(response.loginDetails);
    //   console.log(response);
    // })
    // .then(
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Loggedin successfully",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   })
    // )
    // .then(handleClose())
    // .then(
    //   if ( response === "client"){
    //     history.push("/profile/me")
    //   })
    // .catch((err) => {
    //   if (err.response) {
    //     Swal.fire(
    //       "Oops!",
    //       "Login failed, either email doesn't exist or details incorrect, please try again.",
    //       "error"
    //     );
    //   }
    // });
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
              fullWidth
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
          <Button onClick={tryLogin} className="mt-5" variant="success">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
