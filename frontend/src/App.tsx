import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginButton  from "./pages/LoginButton";
import Home from  "./pages/Home";
import Dashboard from "./pages/Dashboard";

type MyComponentProps = React.PropsWithChildren<{}>;

function PrivateRoute({ children, ...rest }: MyComponentProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("loggedIn") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={(props) => <LoginButton />} />
      <Route path="/Home" exact render={(props) => <Home />} />
      <Route path="/DashBoard" exact render={(props) => <Dashboard />} />
    </Switch>
  </Router>
);

export default App;
