import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import firebase from "../../firebase";
import Login from "./Login.react";
import Spinner from "./Spinner.react";

function Home() {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return <Spinner />;
  } else if (!user) {
    return <Login />;
  }

  return (
    <>
      <h1>Home</h1>
      <Link to="/create">Create Trip</Link>
      <br />
      <Link to="/configure">Configure</Link>
    </>
  );
}

export default Home;
