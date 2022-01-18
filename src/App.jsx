// libraries
// import { PersistGate } from "redux-persist/integration/react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import ClientHomePage from "./Components/ClientDashboard";
import BusinessListPage from "./Components/BusinessListPage";
import BusinessProfilePage from "./Components/BusinessProfilePage";

import UnAuthorized from "./Components/httpStatuses/401.jsx";
///////////////////////////////////////////////////////////////////////////////////////
const App = () => {
  let dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const auth = useSelector((s) => s.helper.loggedin);
  const loggedInUserData = useSelector((state) => state.helper.loggedin);

  return (
    <div className="App">
      <NavBar URL={URL} />
      <Route
        path="/profile/:userId"
        exact
        component={auth ? ClientHomePage : UnAuthorized}
      />
      <Route
        path="/business/me/dashboard"
        component={auth ? DashboardPage : UnAuthorized}
      />
      <Route path="/" exact component={LandingPage} />
      <Route path="/business" exact component={BusinessListPage} />
      <Route path="/business/:userId" exact component={BusinessProfilePage} />
      <Route path="/register" component={RegisterPage} />

      <Footer />
    </div>
  );
};

export default App;
