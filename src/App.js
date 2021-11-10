import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { BrowserRouter as Router,  Route,  } from "react-router-dom";

import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import RegisterPage from "./Components/LoginAndRegister/RegisterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import LoginPage from "./Components/LoginAndRegister/LoginModal";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Router>
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

{
  /* <img src="https://www.clipartmax.com/png/small/252-2520950_shop-local-icon.png" alt="Shop Local - Icon @clipartmax.com"></img> */
}
{
  /* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
}
