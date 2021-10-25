import { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import {
  TextField,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const LoginPage = ({ routerProps }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });
  const URL = process.env.REACT_APP_API_URL;

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const tryLogin = async (event) => {
    event.preventDefault();

    try {
      const details = {
        email: userEmail,
        password: userPassword,
      };

      const res = await fetch(`${URL}/business/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
        localStorage.setItem("accessToken", json.accessToken);
        routerProps.history.push("/business/me");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#94ce89" }}>
      <Container className="m-5">
        <Row className="my-5" style={{ background: "#FFF", width: "70%" }}>
          <Col></Col>
          <Col>
            <TextField
              required
              id="email"
              name="basic"
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
              required
              fullWidth
              label="password"
              name="basic"
              id="password"
              placeholder="1234"
              type={values.showPassword ? "text" : "password"}
              value={userPassword.password}
              onChange={(e) => setUserPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Col>
        </Row>
        <Button onClick={tryLogin}>Login</Button>
        <Button>Contine without login</Button>
      </Container>
    </div>
  );
};

export default LoginPage;
