// Libraries
import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

// Styling
import { Container } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
// import TabPanel from "@mui/lab/TabPanel";

import Box from "@mui/material/Box";
import DATATABLE from "./Dashboard/muiTable";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";

import "./Dashboard/dashboard.css";
import ProfileSettings from "./Dashboard/ProfileSettings";
// Components

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DashboardPages = () => {
  const [data, setData] = useState({});
  const [key, setKey] = useState("home");
  const getBusinessUser = async (userId) => {
    try {
      let res = axios.get(
        `${process.env.REACT_APP_API_URL}/business/${userId}`,
        {
          withCredentials: true,
        }
      );
      await setData(res);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getBusinessUser("me");
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Container>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <DATATABLE />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </SwipeableViews>
      {/* <Tabs  onChange={handleChange} centered>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Home">
          <DATATABLE />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <p></p>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <p></p>
        </Tab
      </Tabs> */}
    </Container>
  );
};

export default DashboardPages;
