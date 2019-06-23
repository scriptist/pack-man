import React from "react";
import styled from "@emotion/styled";
import { useList } from "react-firebase-hooks/database";

import firebase from "../../firebase";
import { LinkButton } from "../components/Button.react";
import { Heading2 } from "./Heading.react";

const { useMemo } = React;

function TripList({ user }) {
  const dbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/trips`),
    [user.uid]
  );
  const [trips] = useList(dbRef);

  const upcomingTrips = useMemo(
    () => {
      const now = new Date();
      return (trips || []).filter(trip => now < new Date(trip.val().dates[0]));
    },
    [trips]
  );

  if (upcomingTrips.length === 0) {
    return null;
  }

  return (
    <>
      <Heading2WithMargin>Upcoming Trips</Heading2WithMargin>
      {upcomingTrips.map(trip => (
        <Trip key={trip.key} trip={trip} />
      ))}
    </>
  );
}

function Trip({ trip }) {
  return (
    <>
      <LinkButton key={trip.key} to={`/trip/${trip.key}`}>
        {trip.val().dates.join(" - ")}
      </LinkButton>
      <br />
    </>
  );
}

// Styles

const Heading2WithMargin = styled(Heading2)`
  margin-top: 64px;
`;

export default TripList;
