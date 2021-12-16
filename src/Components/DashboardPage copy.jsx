// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styling
import { Typography, Box } from "@mui/material/";
import {Row, Nav, Col, Tab} from "react-bootstrap"
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
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return userData.loadingSingle ? (
    <LoaderSpinner />
  ) : userData.error ? (
    <h1>{userData.error}</h1>
  ) : (
    <>
      {/* <Box
        sx={{
          display: "flex",
          height: 1,
          width: 1,
          p: 4,
        }}
      > */}


<Nav variant="pills" activeKey="1" className="flex-column">
      <Nav.Item>
        <Nav.Link eventKey="1" href="#/home">
          NavLink 1 content
        </Nav.Link>
      </Nav.Item>
</Nav>

        
        {/* <Tabs
          className="mt-5 mx-5"
          orientation="vertical"
          value={value}
          onChange={handleTabChange}
        >
          <Tab label="GENERAL DETAILS" {...a11yProps(0)}></Tab>
          <Tab label="PRODUCT DETAILS" {...a11yProps(1)} />
          <Tab label="ALL PRODUCTS" {...a11yProps(2)} />
          <Tab label="PROMOTIONS" {...a11yProps(3)} />
          <Tab label="TRADING HOURS" {...a11yProps(4)} />
          <Tab label="GENERAL INFO" {...a11yProps(5)} />
          <Tab label="" {...a11yProps(6)} />
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
        </TabPanel>
      </Box> */}
    </>
  );
};

export default DashboardPages;
