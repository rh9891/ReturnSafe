import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";




// Checks the token (JWT) in order to keep the user logged in.
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  // Checks for an expired token (JWT).
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logs out the user.
    store.dispatch(logoutUser());

    // Redirects the user to the login page.
    window.location.href = "./login";
  }
}


class App extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <Provider store={store}>

          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
};

export default App;