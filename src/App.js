import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import configureStore from "./Redux/store";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Provider store={configureStore}>
        <NavBar />
        <Router>
          <Route path="/" exact component={LandingPage} />

          <Route
            path="/business/:userId"
            render={(routeProps) => <ProfilePage {...routeProps} />}
          ></Route>
          <Route
            path="/register"
            render={(routerProps) => <RegisterPage routerProps={routerProps} />}
          />
        </Router>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
