import { useDispatch, useSelector } from "react-redux";
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
import { Formik } from "formik";
//////////////////////////////////////////////////////////////////////////////////////

const LoginModal = ({ handleClose, handleChange, loginDetails, loginUser }) => {
  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const modalStatus = useSelector((s) => s.helper.loginModal);

  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  return (
    <>
      <Dialog open={modalStatus} onClose={handleClose}>
        <DialogTitle>LOGIN</DialogTitle>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
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
