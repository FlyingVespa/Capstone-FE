import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//////////////////////////////////////////////////////////////////////////////////////

const LoginModal = ({ handleClose, handleChange, loginDetails, loginUser }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const vpassword = useSelector((s) => s.helper.password_visible);
  const modalStatus = useSelector((s) => s.helper.loginModal);


  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  return (
    <>
      <Dialog open={modalStatus} onClose={handleClose}>
        <DialogTitle>LOGIN</DialogTitle>
        <DialogContent>
          <FormControl>
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
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={loginUser} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginModal;
