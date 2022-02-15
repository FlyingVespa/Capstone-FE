// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Styling
import { Box, Tab } from "@mui/material/";
import { TabList, TabPanel, TabContext } from "@mui/lab";
// import { Row, Nav, Col, Tab } from "react-bootstrap";
import "./Dashboard/dashboard.css";
// Components
import LoaderSpinner from "./Loaders/LoaderSpinner";
import GridData from "./Dashboard/GridData";
import GeneralData from "./Dashboard/GeneralData";
// import { getBusinessUser } from "../network/lib/businessUsers";
import ProfileSettings from "./Dashboard/ProfileSettings";
const DashboardPages = () => {
  const [userData, setUserData] = useState({});
  let dispatch = useDispatch();

  const getBusinessUser = (userId) => {
    try {
      axios
        .get(`${URL}/business/${userId}`, { withCredentials: true })
        .then((result) => {
          setUserData(result.data);
        });
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getBusinessUser("me");
  }, []);

  const [value, setvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setvalue(newValue);
  };

  return userData.loadingSingle ? (
    <LoaderSpinner />
  ) : userData.error ? (
    <h1>{userData.error}</h1>
  ) : (
    <>
      <Box sx={{ display: "flex", height: "65vh" }}>
        <TabContext value={value} orientation="vertical">
          <TabList
            onChange={handleTabChange}
            aria-label="lab API tabs example"
            centered
            className="m-5"
            orientation="vertical"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
          <TabPanel value="1">
            <GridData userData={userData} />
          </TabPanel>
          <TabPanel value="2">
            <GeneralData />
          </TabPanel>
          <TabPanel value="3">
            <ProfileSettings />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default DashboardPages;
