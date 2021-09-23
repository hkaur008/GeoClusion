import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import Login from "./pages/Login";
import LoginButton  from "./pages/LoginButton";
import Home from  "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Particles from "react-particles-js";
const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={(props) => <LoginButton />} />
      <Route path="/Home" exact render={(props) => <Home />} />
      <Route path="/DashBoard" exact render={(props) => <Dashboard />} />
    </Switch>
  </Router>
  // <Particles></Particles>
);

export default App;
