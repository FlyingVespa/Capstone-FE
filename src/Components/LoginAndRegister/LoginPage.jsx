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
const LoginPage = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ background: "#94ce89" }}>
      <Container className="m-5">
        <Row className="my-5" style={{ background: "#FFF", width: "70%" }}>
          <Col></Col>
          <Col>
            <TextField
              id="email"
              name="basic"
              className="my-1"
              variant="standard"
              placeholder="Enter Your email used for login"
              label="Account Email"
              value=""
              helperText="*Required - not shared with public"
              fullWidth
            />
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              fullWidth
              label="password"
              name="basic"
              id="password"
              type={values.showPassword ? "text" : "password"}
              value=""
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
        <Button>Login</Button>
        <Button>Contine without login</Button>
      </Container>
    </div>
  );
};

export default LoginPage;
