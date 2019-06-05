import React from "react";
import { useListVals } from "react-firebase-hooks/database";

import defaultItems from "../../defaultItems";
import firebase from "../../firebase";
import Error from "./Error.react";
import Spinner from "./Spinner.react";

const { useEffect, useMemo } = React;

function Configure({ user }) {
  const dbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/items`),
    [user]
  );
  const [value, loading, error] = useListVals(dbRef);

  useEffect(
    () => {
      if (!loading && value.length === 0) {
        // Set default configuration
        dbRef.set(defaultItems);
      }
    },
    [dbRef, loading, value]
  );

  if (loading || value == null) {
    return <Spinner />;
  } else if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <h1>Configure</h1>
    </>
  );
}

export default Configure;
