// libraries
// import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
// Styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// components
import store from "./redux/store";
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import DashboardPage from "./Components/DashboardPage";
import ClientHomePage from "./Components/ClientHomePage";
///////////////////////////////////////////////////////////////////////////////////////
const App = () => {
  const URL = process.env.REACT_APP_API_URL;
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavBar URL={URL} />
          <Route
            path="/profile/:userId"
            exact
            render={(routeProps) => (
              <ClientHomePage {...routeProps} URL={URL} />
            )}
          ></Route>
          <Route
            path="/business/:userId/dashboard"
            exact
            render={(routeProps) => <DashboardPage {...routeProps} URL={URL} />}
          ></Route>

          <Route path="/" exact component={LandingPage} />
          <Route
            path="/business"
            exact
            render={(routeProps) => <HomePage {...routeProps} URL={URL} />}
          ></Route>

          <Route
            path="/business/:userId"
            exact
            render={(routeProps) => <ProfilePage {...routeProps} />}
          ></Route>

          <Route
            path="/register"
            render={(routerProps) => (
              <RegisterPage routerProps={routerProps} URL={URL} />
            )}
          />
        </Router>
        <Footer />
      </Provider>
    </>
  );
};

export default App;
