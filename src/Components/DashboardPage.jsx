// Libraries
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// Styling
import { Tabs, Tab, Typography, Box } from "@mui/material/";
import "./Dashboard/dashboard.css";
// Components
import LoaderSpinner from "./Loaders/LoaderSpinner";
import GridData from "./Dashboard/GridData";
import GeneralData from "./Dashboard/GeneralData";
import ProductList from "./Dashboard/ProductList";
import { fetchLoggedInUser } from "../redux";

////////////////////////////////////////////////////////////////////////////////

function DashboardPage({ URL, fetchLoggedInUser, userData }) {
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const [value, setValue] = useState(0);

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
      <Box
        sx={{
          display: "flex",
          height: 1,
          width: 1,
          p: 4,
        }}
      >
        <Tabs
          className="mt-5 mx-5"
          orientation="vertical"
          value={value}
          onChange={handleChange}
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
        <TabPanel value={value} index={2} style={{ width: 1200 }}>
          <GridData user={userData} />
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
}
const mapStateToProps = (state) => {
  return {
    userData: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
