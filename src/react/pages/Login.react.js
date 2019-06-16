import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router";

import firebase from "../../firebase";
import ErrorPage from "./ErrorPage.react";
import Spinner from "./Spinner.react";
import Button from "../components/Button.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";

const { useCallback } = React;

function Login() {
  const [user, loading, error] = useAuthState(firebase.auth());

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }, []);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  } else if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Heading>Log in</Heading>
      <Button type="button" onClick={login}>
        Log in with Google
      </Button>
    </Page>
  );
}

export default Login;
