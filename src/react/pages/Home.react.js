import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../../firebase";
import Heading from "../components/Heading.react";
import { LinkButton } from "../components/Button.react";
import ErrorPage from "./ErrorPage.react";
import Login from "./Login.react";
import Page from "../components/Page.react";
import Spinner from "./Spinner.react";
import TripList from "../components/TripList.react";

function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  } else if (!user) {
    return <Login />;
  }

  return (
    <Page>
      <Heading>Home</Heading>
      <LinkButton to="/create">Create Trip</LinkButton>
      <br />
      <LinkButton to="/configure">Configure</LinkButton>
      <TripList user={user} />
    </Page>
  );
}

export default Home;
