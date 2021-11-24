// Libraries
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
// Styling
import { Tabs, Tab, Typography, Box } from "@mui/material/";
import "./Dashboard/dashboard.css";
// Components
import GridData from "./Dashboard/GridData";
import GeneralData from "./Dashboard/GeneralData";
import ProductList from "./Dashboard/ProductList";

////////////////////////////////////////////////////////////////////////////////

const DashboardPage = ({ URL }) => {
  const [value, setValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(0);

  const userId = useParams.userId;
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${URL}/business/${userId}/dashboard`);
      if (response.ok) {
        const userData = await response.json();
        await setCurrentUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.paper",
          height: 1,
          width: 1,
        }}
      >
        <Tabs
          className="mt-5 mx-5"
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <p>General Details</p>
          <Tab label="GENERAL DETAILS" {...a11yProps(0)}></Tab>
          <Tab label="PRODUCT DETAILS" {...a11yProps(1)} />
          <p>Products</p>
          <Tab label="ALL PRODUCTS" {...a11yProps(2)} />
          <Tab label="PROMOTIONS" {...a11yProps(3)} />
          <p>Business Profile</p>
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
        <TabPanel value={value} index={2} style={{ flexGrow: 1 }}>
          <GridData />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Trading Hours
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
};

export default DashboardPage;
