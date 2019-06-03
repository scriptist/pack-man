import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { css, Global } from "@emotion/core";
import { HashRouter as Router } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router";

import firebase from "../firebase";
import Configure from "./pages/Configure.react";
import CreateTrip from "./pages/CreateTrip.react";
import Home from "./pages/Home.react";
import List from "./pages/List.react";
import Login from "./pages/Login.react";
import Spinner from "./pages/Spinner.react";

function Root() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/configure" component={Configure} />
          <PrivateRoute path="/create" component={CreateTrip} />
          <PrivateRoute path="/list" component={List} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      />
    </>
  );
}

// Helpers

function PrivateRoute({ component: Component, ...props }) {
  const [user, loading] = useAuthState(firebase.auth());

  return (
    <Route
      {...props}
      render={componentProps => {
        if (loading) {
          return <Spinner />;
        } else if (user) {
          return <Component {...componentProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default Root;
