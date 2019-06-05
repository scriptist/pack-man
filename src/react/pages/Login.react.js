import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router";

import firebase from "../../firebase";
import Error from "./Error.react";
import Spinner from "./Spinner.react";

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
    return <Error error={error} />;
  } else if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Log in</h1>
      <button type="button" onClick={login}>
        Log in with Google
      </button>
    </>
  );
}

export default Login;
