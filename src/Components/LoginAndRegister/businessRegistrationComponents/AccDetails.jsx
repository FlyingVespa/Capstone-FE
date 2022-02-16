import {
  TextField,
  InputAdornment,
  Input,
  IconButton,
  InputLabel,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

const AccDetails = ({ d, f }) => {
  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const { bio, category, businessname, email, username, url, password } = d;
  return (
    <div className="acc-details my-5">
      <FormLabel component="legend">Basic Account Details</FormLabel>
      <TextField
        name="businessname"
        className="my-1"
        variant="standard"
        placeholder="Enter Your Business Name"
        label="Business Name"
        value={businessname}
        onChange={f}
        fullWidth
      />

      <TextField
        name="email"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={email}
        onChange={f}
        helperText="*Required - not shared with public"
        fullWidth
      />
      <Row>
        <Col md={12}>
          <TextField
            name="username"
            className="my-1"
            variant="standard"
            placeholder="Your preffered nickname?"
            label="Username"
            value={username}
            onChange={f}
            fullWidth
          />
        </Col>
        <Col md={12}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            fullWidth
            label="password"
            name="password"
            type={vpassword ? "text" : "password"}
            value={password}
            onChange={f}
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
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextField
            name="url"
            className="my-1"
            variant="standard"
            placeholder="Enter Your preffered"
            label="Choose Custom Url"
            value={url}
            onChange={f}
            helperText="*Required - an address online where customers can find your business"
            fullWidth
          />
        </Col>
        <Col md={12}>
          <TextField
            name="category"
            label="Bussines Category"
            variant="standard"
            placeholder="Tell us about you business"
            value={category}
            onChange={f}
            multiline
            fullWidth
          />
        </Col>
      </Row>
      <TextField
        name="bio"
        label="Describe the business"
        variant="standard"
        placeholder="Tell us about you business"
        value={bio}
        onChange={f}
        multiline
        fullWidth
      />
    </div>
  );
};

export default AccDetails;
