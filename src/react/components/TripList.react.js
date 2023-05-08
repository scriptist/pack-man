import React from "react";
import styled from "@emotion/styled";
import { useList } from "react-firebase-hooks/database";

import firebase from "../../firebase";
import { LinkButton } from "../components/Button.react";
import { Heading2 } from "./Heading.react";

const { useMemo } = React;

const EM_DASH = "\u2014";

function TripList({ user }) {
  const dbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/trips`),
    [user.uid],
  );
  const [trips] = useList(dbRef);

  const upcomingTrips = useMemo(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return (trips || []).filter(
      (trip) => startOfDay < new Date(trip.val().dates[1]),
    );
  }, [trips]);

  if (upcomingTrips.length === 0) {
    return null;
  }

  return (
    <>
      <Heading2WithMargin>Upcoming Trips</Heading2WithMargin>
      {upcomingTrips.map((trip) => (
        <div key={trip.key}>
          <LinkButton to={`/trip/${trip.key}`}>
            {trip.val().dates.join(` ${EM_DASH} `)}
          </LinkButton>
        </div>
      ))}
    </>
  );
}

// Styles

const Heading2WithMargin = styled(Heading2)`
  margin-top: 64px;
`;

export default TripList;
