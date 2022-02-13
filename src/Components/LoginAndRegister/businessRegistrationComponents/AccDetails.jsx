import {
  TextField,
  InputAdornment,
  Input,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

const AccDetails = ({ datas, handleChange, f }) => {
  const dispatch = useDispatch();
  const vpassword = useSelector((s) => s.helper.password_visible);
  const handleClickShowPassword = () => {
    dispatch({ type: "SHOW_PASSWORD", payload: !vpassword });
  };

  const { bio, category, businessname, email, username, url, password } = datas;
  return (
    <div className="my-5">
      <TextField
        name="businessname"
        className="my-1"
        variant="standard"
        placeholder="Enter Your Business Name"
        label="Business Name"
        value={businessname}
        onChange={handleChange}
      />

      <TextField
        name="email"
        className="my-1"
        variant="standard"
        placeholder="Enter Your email used for login"
        label="Account Email"
        value={email}
        onChange={handleChange}
        helperText="*Required - not shared with public"
      />
      <Row>
        <Col>
          <TextField
            name="username"
            className="my-1"
            variant="standard"
            placeholder="Your preffered nickname?"
            label="Username"
            value={username}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            label="password"
            name="password"
            type={vpassword ? "text" : "password"}
            value={password}
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
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            name="url"
            className="my-1"
            variant="standard"
            placeholder="Enter Your preffered"
            label="Choose Custom Url"
            value={url}
            onChange={handleChange}
            helperText="*Required - an address online where customers can find your business"
          />
        </Col>
        <Col>
          <TextField
            name="category"
            label="Bussines Category"
            variant="standard"
            placeholder="Tell us about you business"
            value={category}
            onChange={handleChange}
            multiline
          />
        </Col>
      </Row>
      <TextField
        name="bio"
        label="Describe the business"
        variant="standard"
        placeholder="Tell us about you business"
        value={bio}
        onChange={handleChange}
        multiline
      />
    </div>
  );
};

export default AccDetails;
