import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Route } from "react-router-dom";

import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import DashboardPage from "./Components/DashboardPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Router>
          <Route
            path="/business/:userId/dashboard"
            exact
            render={(routeProps) => <DashboardPage {...routeProps} />}
          ></Route>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/business"
            exact
            render={(routeProps) => <HomePage {...routeProps} />}
          ></Route>

          <Route
            path="/business/:userId"
            exact
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
