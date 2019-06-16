import React from "react";
import { useListVals } from "react-firebase-hooks/database";

import defaultItems from "../../defaultItems";
import firebase from "../../firebase";
import Category from "../components/config/Category.react";
import ErrorPage from "./ErrorPage.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";
import Spinner from "./Spinner.react";

const { useCallback, useEffect, useMemo } = React;

function Configure({ user }) {
  const dbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/items`),
    [user]
  );
  const [categories, loading, error] = useListVals(dbRef);

  // Set default config if nothing is set yet
  useEffect(
    () => {
      if (!loading && categories.length === 0) {
        dbRef.set(defaultItems);
      }
    },
    [dbRef, loading, categories]
  );

  const updateCategory = useCallback(
    (i, value) => {
      const newCategories = [...categories];
      newCategories[i] = value;
      dbRef.set(newCategories);
    },
    [categories, dbRef]
  );

  if (loading || categories == null) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Page>
      <Heading>Configure</Heading>
      <div>
        {categories.map((category, i) => (
          <Category
            category={category}
            key={i}
            onChange={v => updateCategory(i, v)}
          />
        ))}
      </div>
    </Page>
  );
}

export default Configure;
