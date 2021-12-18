// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styling
import { Box, Tab } from "@mui/material/";
import { TabList, TabPanel, TabContext } from "@mui/lab";
// import { Row, Nav, Col, Tab } from "react-bootstrap";
import "./Dashboard/dashboard.css";
// Components
import LoaderSpinner from "./Loaders/LoaderSpinner";
import GridData from "./Dashboard/GridData";
import GeneralData from "./Dashboard/GeneralData";
import { getBusinessUser } from "../network/lib/businessUsers";

const DashboardPages = () => {
  const [userData, setUserData] = useState({});
  let dispatch = useDispatch();

  useEffect(() => {
    getBusinessUser("me", setUserData);
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
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default DashboardPages;
