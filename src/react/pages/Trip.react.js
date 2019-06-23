import React from "react";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";

import firebase from "../../firebase";
import Category from "../components/trip/Category.react";
import ErrorPage from "./ErrorPage.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";
import Spinner from "./Spinner.react";

function Trip({ match, user }) {
  const [trip, tripLoading, tripError] = useObjectVal(
    firebase.database().ref(`users/${user.uid}/trips/${match.params.id}`)
  );
  const [categories, catLoading, catError] = useListVals(
    firebase.database().ref(`users/${user.uid}/items`)
  );

  if (tripError || catError) {
    return <ErrorPage error={tripError || catError} />;
  } else if (tripLoading || catLoading) {
    return <Spinner />;
  } else if (trip == null || categories == null) {
    return <ErrorPage error={new Error("Could not find trip or config")} />;
  }

  return (
    <Page>
      <Heading back>Trip</Heading>
      <div>
        {categories.map((category, i) => (
          <Category category={category} key={i} trip={trip} />
        ))}
      </div>
    </Page>
  );
}

export default Trip;
