// libraries
// import { PersistGate } from "redux-persist/integration/react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useState } from "react";

// import { Provider } from "react-redux";
// Styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// components
// import { store, persistor } from "./redux/store";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import DashboardPage from "./Components/DashboardPage";
import ClientHomePage from "./Components/ClientHomePage";
import GeneralPage from "./Components/GeneralPage";
import BusinessProfilePage from "./Components/BusinessProfilePage";
import BasicDocument from "./Components/ProfilePage/BasicDocument";
import LocationDetails from "./Components/LoginAndRegister/businessRegistrationComponents/LocationDetails";

import UnAuthorized from "./Components/httpStatuses/401.jsx";
///////////////////////////////////////////////////////////////////////////////////////
const App = () => {
  let dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const auth = useSelector((s) => s.helper.loggedin);
  const loggedInUserData = useSelector((state) => state.helper.loggedin);
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Fragment>
        <NavBar URL={URL} user={user} />
        <Routes>
          <Route path="/autocomplete" exact element={<LocationDetails />} />
          <Route
            path="/profile/:userId"
            exact
            element={auth ? <ClientHomePage /> : <UnAuthorized />}
          />
          <Route
            path="/business/me/dashboard"
            element={auth ? <DashboardPage /> : <UnAuthorized />}
          />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/business" element={<GeneralPage />} />
          <Route
            exact
            path="/business/:userId"
            element={<BusinessProfilePage setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/business/me/pdfPage" element={<BasicDocument />} /> */}
        </Routes>
        <Footer />
      </Fragment>
    </div>
  );
};

export default App;
