// Libraries
import { useState, useEffect } from "react";

import axios from "axios";

// Styling
import { Box, Tab } from "@mui/material/";
import { TabList, TabPanel, TabContext } from "@mui/lab";
// import { Row, Nav, Col, Tab } from "react-bootstrap";
import "./Dashboard/dashboard.css";
// Components

import GridData from "./Dashboard/GridData";
import ProductSettings from "./Dashboard/ProductSettings";

const DashboardPages = () => {
  const [data, setData] = useState({});

  const getBusinessUser = async (userId) => {
    try {
      let res = axios.get(
        `${process.env.REACT_APP_API_URL}/business/${userId}`,
        {
          withCredentials: true,
        }
      );
      let result = await res.result;
      await setData(res);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    getBusinessUser("me");
  }, []);

  return (
    <>
      <div>
        <h2>Dashboard</h2>
        {data && <ProductSettings userData={data} />}
      </div>
    </>
  );
};

export default DashboardPages;
