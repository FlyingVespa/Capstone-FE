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
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import DashboardPage from "./Components/DashboardPage";
import ClientHomePage from "./Components/ClientHomePage";
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
      <Route path="/profile/:userId" exact component={ auth ? ClientHomePage : UnAuthorized } />
      <Route
        path="/business/me/dashboard"
        component={auth ? DashboardPage : UnAuthorized}
      />
      <Route path="/" exact component={LandingPage} />
      <Route path="/business" exact component={HomePage} />
      <Route path="/business/:userId" exact component={ProfilePage} />
      <Route path="/register" component={RegisterPage} />
     
      <Footer />
    </div>
  );
};

export default App;
