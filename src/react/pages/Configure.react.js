import React from "react";
import { useListVals } from "react-firebase-hooks/database";
import keyMirror from "keymirror";

import {
  activities as defaultActivities,
  list as defaultList
} from "../../defaults";
import firebase from "../../firebase";
import Activities from "../components/config/Activities.react";
import Categories from "../components/config/Categories.react";
import ErrorPage from "./ErrorPage.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";
import Spinner from "./Spinner.react";
import Tabs from "../components/Tabs.react";

const { useEffect, useMemo, useState } = React;

const TabOptions = keyMirror({
  List: null,
  Activities: null
});

function Configure({ user }) {
  // Tabs
  const [tab, setTab] = useState(TabOptions.List);

  // List
  const listDbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/items`),
    [user]
  );
  const [list, listLoading, listError] = useListVals(listDbRef);

  // Activities
  const actDbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/activities`),
    [user]
  );
  const [activities, actLoading, actError] = useListVals(actDbRef);

  // Set default config if nothing is set yet
  useEffect(
    () => {
      if (!listLoading && list.length === 0) {
        listDbRef.set(defaultList);
      }
    },
    [listDbRef, listLoading, list.length]
  );

  useEffect(
    () => {
      if (!actLoading && activities.length === 0) {
        actDbRef.set(defaultActivities);
      }
    },
    [actDbRef, actLoading, activities.length]
  );

  if (listLoading || actLoading) {
    return <Spinner />;
  } else if (listError || actError) {
    return <ErrorPage error={listError || actError} />;
  }

  return (
    <Page>
      <Heading>Configure</Heading>
      <Tabs onChange={setTab} selected={tab} tabs={Object.values(TabOptions)} />
      {tab === TabOptions.List && (
        <Categories
          activities={activities}
          categories={list}
          onChange={c => listDbRef.set(c)}
        />
      )}
      {tab === TabOptions.Activities && <Activities activities={activities} />}
    </Page>
  );
}

export default Configure;
