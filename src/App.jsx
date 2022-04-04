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
import ClientPage from "./Components/ClientPage";
import HomePage from "./Components/HomePage";
import BusinessPage from "./Components/BusinessPage";
import UnAuthorized from "./Components/httpStatuses/401.jsx";
import NotFound from "./Components/httpStatuses/404.jsx";
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
          <Route
            path="/profile/:userId"
            exact
            element={auth ? <ClientPage /> : <UnAuthorized />}
          />
          <Route
            path="/business/me/dashboard"
            element={auth ? <DashboardPage /> : <UnAuthorized />}
          />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/business" element={<HomePage />} />
          <Route
            exact
            path="/business/:userId"
            element={<BusinessPage setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/page_error/404" element={<NotFound />} />
        </Routes>
        <Footer />
      </Fragment>
    </div>
  );
};

export default App;
