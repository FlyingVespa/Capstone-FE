import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});

  const fetchUserData = async (profileId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/business/${profileId}`, {
        withCredentials: true,
      });
      setProfileData(response.data);
      console.log("ProfileData:", response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Profile Settings</h2>
      {profileData && (
        <Container className="p-3">
          <Container>
            <Row>
              <Col>
                <p>Name</p>
              </Col>
              <Col>
                <p>{profileData.businessName}</p>
              </Col>
            </Row>
            <Row>Business Name</Row>
            <Row>Email</Row>
            <Row>Phone</Row>
            <Row>Trading Hours</Row>
          </Container>
        </Container>
      )}
    </div>
  );
}

export default ProfileSettings;
