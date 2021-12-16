// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styling
import { Typography, Box, Tabs, Tab, Fab } from "@mui/material/";
import { TabList , TabPanel, TabContext } from "@mui/lab";
// import { Row, Nav, Col, Tab } from "react-bootstrap";
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
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
     <Fab variant="extended">
  <PhoneMissedIcon sx={{ mr: 1 }} />
  Navigate
</Fab>

      <TabContext value={value} >
          <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered className="m-5"> 
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
            <Tab icon={<PhoneIcon />} label="top" />
          </TabList>
        <TabPanel value="1"><GridData userData={userData} /></TabPanel>
        <TabPanel value="2"><GeneralData/></TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
  

       {/* <Tabs
          className="mt-5 mx-5"
          value={value}
          onChange={handleTabChange}
        >
          <Tab label="GENERAL DETAILS"></Tab>
          <Tab label="PRODUCT DETAILS" />
          <Tab label="ALL PRODUCTS" />
          <Tab label="PROMOTIONS"  />
          <Tab label="TRADING HOURS"  />
          <Tab label="GENERAL INFO"  />
          <Tab label="" />
        </Tabs>
        <TabPanel value={value} index={0}>
          123
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GeneralData URL={URL} />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: 1200 }}>
          <GridData userData={userData} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Trading Hours
        </TabPanel>
        <TabPanel value={value} index={4}></TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
    
    </>
  );
};

export default DashboardPages;
