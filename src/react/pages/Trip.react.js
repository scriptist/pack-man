import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";

import firebase from "../../firebase";
import ErrorPage from "./ErrorPage.react";
import Spinner from "./Spinner.react";

function Trip({ match, user }) {
  const [trip, loading, error] = useObjectVal(
    firebase.database().ref(`users/${user.uid}/trips/${match.params.id}`)
  );

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  } else if (trip == null) {
    return <ErrorPage error={new Error("Could not find trip")} />;
  }

  return (
    <>
      <h1>Trip</h1>
      <pre>{JSON.stringify(trip, null, 4)}</pre>
    </>
  );
}

export default Trip;
