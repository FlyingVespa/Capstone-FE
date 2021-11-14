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
import { render } from "@testing-library/react";
const LoginModal = ({ handleShow, handleClose, show }) => {
  let history = useHistory();
  const [loginDetails, setLoginDetails] = useState({
    email: null,
    password: null,
  });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const URL = process.env.REACT_APP_API_URL;

  const handleChange = ({ target }) => {
    setLoginDetails({ ...loginDetails, [target.name]: target.value });
  };
  const tryLogin = (e) => {
    console.log("login");
    e.preventDefault();
    axios
      .post(`${URL}/login`, loginDetails)
      .then((response) => {
        JSON.stringify(response.loginDetails);
        console.log(response);
        if (response.ok) {
          Swal.fire(
            "Regsitered Sucessfully!",
            "You will be able to login in a few moments",
            "success"
          ).then(history.push("/"));
        }
      })
      .catch((err) => {
        // add status code responses
        if (err.response) {
          Swal.fire(
            "Oops!",
            "Login failed, either email doesn't exist or details incorrect, please try again.",
            "error"
          );
        }
      });
  };
  //   event.preventDefault();
  //   console.log("login");
  //   try {
  //     const details = {
  //       email: userEmail,
  //       password: userPassword,
  //     };
  //     const res = await fetch(`${URL}/business/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(details),
  //     });
  //     if (res.ok) {
  //       const json = await res.json();
  //       console.log(json);
  //       localStorage.setItem("accessToken", json.accessToken);
  //       history.push("/business/me");
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // return (
  //   <div style={{ background: "#94ce89" }}>
  //     <Container className="m-5">
  //       <Row className="my-5" style={{ background: "#FFF", width: "70%" }}>
  //         <Col></Col>
  //         <Col>
  //           <TextField
  //             required
  //             id="email"
  //             name="basic"
  //             className="my-1"
  //             variant="standard"
  //             placeholder="Enter Your email used for login"
  //             label="Account Email"
  //             value={userEmail}
  //             placeholder="test@test.com"
  //             helperText="*Required - not shared with public"
  //             fullWidth
  //             onChange={(e) => setUserEmail(e.target.value)}
  //           />
  //           <InputLabel htmlFor="standard-adornment-password">
  //             Password
  //           </InputLabel>
  //           <Input
  //             required
  //             fullWidth
  //             label="password"
  //             name="basic"
  //             id="password"
  //             placeholder="1234"
  //             type={values.showPassword ? "text" : "password"}
  //             value={userPassword.password}
  //             onChange={(e) => setUserPassword(e.target.value)}
  //             endAdornment={
  //               <InputAdornment position="end">
  //                 <IconButton
  //                   aria-label="toggle password visibility"
  //                   onClick={handleClickShowPassword}
  //                   onMouseDown={handleMouseDownPassword}
  //                 >
  //                   {values.showPassword ? <VisibilityOff /> : <Visibility />}
  //                 </IconButton>
  //               </InputAdornment>
  //             }
  //           />
  //         </Col>
  //       </Row>
  //       <Button onClick={tryLogin}>Login</Button>
  //       <Button>Contine without login</Button>
  //     </Container>
  //   </div>

  return (
    <>
      <Modal show={show} onHide={handleClose} close>
        <Modal.Body closeButton>
          <h3>Login</h3>
          <Form>
            <TextField
              required
              name="email"
              className="my-1"
              variant="standard"
              placeholder="Enter Your email used for login"
              label="Account Email"
              value={userEmail}
              placeholder="test@test.com"
              helperText="*Required - not shared with public"
              fullWidth
              onChange={(e) => setUserEmail(e.target.value)}
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
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {vpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button onClick={tryLogin} className="mt-5" variant="success">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
