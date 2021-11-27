//libraries
import axios from 'axios'
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// styles
import { Tabs, Tab, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
//components
import { currentUserDetails } from "../redux/users/userAction";

///////////////////////////////////////////////////////////////////////////////
const TabPanel =(props) =>{
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
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const ClientHomePage = () => {
  const [value, setValue] = useState(0);
  let params = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedin = useSelector((s) => s.helper.loggedin);

  const [currentUser, setCurrentUser] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getCurrentUser = () => {
    if (loggedin === true) {
      axios
        .get(`${URL}/profile/me`, { withCredentials: true })
        .then((res) => JSON.stringify(res))
        .then(result => console.log(result))
        .then((result) => setCurrentUser(result))
        .then(() => console.log("CURRENTUSER", currentUser))
        .then(dispatch(currentUserDetails(currentUser)));
    } else {
      alert("Please login before accessing dashboard");
      history.push("/");
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <LinkTab
            icon={<TravelExploreIcon />}
            label="SEARCH STORES"
            // {...a11yProps(0)}
            href="/trash"
          />
          <LinkTab
            icon={<PersonPinIcon />}
            label="NEARBY"
            // {...a11yProps(1)}
            href="/trashs"
          />
          <LinkTab
            icon={<FavoriteIcon />}
            label="FAVORITES"
            // {...a11yProps(2)}
            href="/spam"
          />
        </Tabs>
      </Box>
      {/* 
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
};

export default ClientHomePage;
