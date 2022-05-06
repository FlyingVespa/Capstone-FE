import React, { useState, useEffect } from "react";
// import Autocomplete from "react-google-autocomplete";
import {
  Container,
  Row,
  Col,
  Card,
  FormLabel,
  FormControl,
  FormGroup,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Switch from "@mui/material/Switch";
import { set } from "lodash";
import LocationDetails from "../LoginAndRegister/businessRegistrationComponents/LocationDetails";
import TradingHoursDetails from "../LoginAndRegister/businessRegistrationComponents/TradingHoursDetails";
function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [profileDataOld, setProfileDataOld] = useState({});
  const [basicEdit, setBasicEdit] = useState(false);
  const [companyEdit, setCompanyEdit] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);

  const fetchUserData = async (profileId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/business/${profileId}`,
        {
          withCredentials: true,
        }
      );
      setProfileData(response.data);
      setProfileDataOld(response.data);
      console.log("ProfileData:", response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData("me");
  }, []);

  const [profileData, setProfileData] = useState({});
  const [editStatusA, setEditStatusA] = useState(true);
  const [editStatusB, setEditStatusB] = useState(true);
  const [editStatusC, setEditStatusC] = useState(true);
  const [editStatusD, setEditStatusD] = useState(true);
  const [editStatusE, setEditStatusE] = useState(true);

  const basicDetails = ({ target }) => {
    if (target.checked === true) {
      setEditStatusA(false);
    } else {
      setEditStatusA(true);
    }
  };

  function companyDetails({ target }) {
    if (target.checked === true) {
      setEditStatusB(false);
    } else {
      setEditStatusB(true);
    }
  }
  function addressDetails({ target }) {
    if (target.checked === true) {
      setEditStatusD(false);
    } else {
      setEditStatusD(true);
    }
  }
  function tradingDetails({ target }) {
    if (target.checked === true) {
      setEditStatusE(false);
    } else {
      setEditStatusE(true);
    }
  }
  const { businessname, category, username, url, email, password } =
    profileData;

  const dispatch = useDispatch();
  const handleAddressChange = (payload) => {
    setProfileData({
      ...profileData,
      address: payload,
    });
  };

  const handleAccDetailsChange = (payload) => {
    setProfileData({
      ...profileData,
      accdetails: payload,
    });
  };
  const handleCompanyDetailsChange = (payload) => {
    setProfileData({
      ...profileData,
      companydetails: payload,
    });
  };

  const handleTimeChange = (times) => {
    setProfileData({
      ...profileData,
      tradingtimes: times,
    });
  };

  return (
    <Card>
      <h2>Profile Settings</h2>
      {profileData && (
        <Container className="p-3">
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="mb-0">Basic Details</h5>
                    <Switch
                      color="primary"
                      onChange={basicDetails}
                      id="settings_basic_checkbox"
                    />
                  </Col>
                </Row>
                <hr />
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <span id="smalltext">Business Name</span>
                  </InputGroup.Text>
                  <FormControl
                    disabled={editStatusA}
                    value={businessname}
                    onChange={handleAccDetailsChange}
                    id="settings_basic"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Category</InputGroup.Text>
                  <FormControl
                    disabled={editStatusA}
                    value={category}
                    id="sb"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Username</InputGroup.Text>
                  <FormControl
                    disabled={editStatusA}
                    value={username}
                    id="settings_basic"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Url</InputGroup.Text>
                  <FormControl
                    disabled={editStatusA}
                    value={url}
                    id="settings_basic"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Email</InputGroup.Text>
                  <FormControl
                    disabled={editStatusA}
                    value={email}
                    id="settings_basic"
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="mb-0">Basic Details</h5>
                    <Switch
                      color="primary"
                      onChange={companyDetails}
                      id="settings_basic_checkbox"
                    />
                  </Col>
                </Row>
                <hr />
                <InputGroup className="mb-3">
                  <InputGroup.Text>Phone</InputGroup.Text>
                  <FormControl
                    disabled={editStatusB}
                    value={profileData.companydetails?.mobile}
                    onChange={handleCompanyDetailsChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Email</InputGroup.Text>
                  <FormControl
                    disabled={editStatusB}
                    value={profileData?.email}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Bio</InputGroup.Text>
                  <FormControl
                    disabled={editStatusB}
                    value={profileData.companydetails?.bio}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text>Public Email</InputGroup.Text>
                  <FormControl
                    disabled={editStatusB}
                    value={profileData.companydetails?.public_email}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={12} lg={4}>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="mb-0">Basic Details</h5>
                    <Switch
                      color="primary"
                      onChange={companyDetails}
                      id="settings_basic_checkbox"
                    />
                  </Col>
                </Row>
                <hr />
                <InputGroup className="mb-3">
                  <InputGroup.Text>Street Number</InputGroup.Text>
                  <FormControl disabled={editStatusC} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Email</InputGroup.Text>
                  <FormControl disabled={editStatusC} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Bio</InputGroup.Text>
                  <FormControl disabled={editStatusC} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Public Email</InputGroup.Text>
                  <FormControl disabled={editStatusC} />
                </InputGroup>
              </Col>
              <Col>
                <p>{profileData.businessName}</p>
              </Col>
            </Row>

            <br />

            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h5 className="mb-0">Address Details</h5>
                <Switch
                  color="primary"
                  onChange={addressDetails}
                  id="settings_basic_checkbox"
                />
              </Col>
            </Row>
            <hr />
            <LocationDetails
              f={handleAddressChange}
              d={profileData}
              s={editStatusD}
            />

            <br />

            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h5 className="mb-0">Trading Times Details</h5>
                <Switch
                  color="primary"
                  onChange={tradingDetails}
                  id="settings_basic_checkbox"
                />
              </Col>
            </Row>
            <hr />
            <TradingHoursDetails
              f={handleTimeChange}
              d={profileData}
              s={editStatusE}
            />
          </Container>
        </Container>
      )}
      <hr />
      <Row>
        <Col></Col>
        <Col>
          <Button> Delete Pofile</Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Button> Save Changes</Button>
        </Col>
      </Row>
    </Card>
  );
}

export default ProfileSettings;
