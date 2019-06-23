import { css, Global } from "@emotion/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashRouter as Router } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router";

import { Colors } from "../constants";
import firebase from "../firebase";
import Configure from "./pages/Configure.react";
import CreateTrip from "./pages/CreateTrip.react";
import ErrorPage from "./pages/ErrorPage.react";
import Home from "./pages/Home.react";
import Login from "./pages/Login.react";
import Spinner from "./pages/Spinner.react";
import Trip from "./pages/Trip.react";

function Root() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/configure" component={Configure} />
          <PrivateRoute exact path="/create" component={CreateTrip} />
          <PrivateRoute exact path="/trip/:id" component={Trip} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
      <Global
        styles={css`
          body {
            background: ${Colors.Background};
            color: ${Colors.Foreground};
            margin: 0;
            font-family: Montserrat, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #root {
            min-height: 100vh;
          }

          body::-webkit-scrollbar {
            width: 12px;
          }

          body::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: ${Colors.BackgroundDark};
          }
        `}
      />
    </>
  );
}

// Helpers

function PrivateRoute({ component: Component, ...props }) {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <Route
      {...props}
      render={componentProps => {
        if (loading) {
          return <Spinner />;
        } else if (error) {
          return <ErrorPage error={error} />;
        } else if (user) {
          return <Component user={user} {...componentProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default Root;
