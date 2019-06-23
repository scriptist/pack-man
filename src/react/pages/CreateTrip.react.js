/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { useListVals } from "react-firebase-hooks/database";

import firebase from "../../firebase";
import { getDays } from "../../utils";
import Button from "../components/Button.react";
import ErrorPage from "./ErrorPage.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";
import Question from "../components/Question.react";
import Spinner from "./Spinner.react";

const { useCallback, useMemo, useState } = React;

const LAUNDRY_MIN_DAYS = 7;
const LAUNDRY_MIN_VALUE = 3;

function CreateTrip({ history, user }) {
  // Activities
  const dbRef = useMemo(
    () => firebase.database().ref(`users/${user.uid}/activities`),
    [user]
  );
  const [activities, loading, error] = useListVals(dbRef);

  // Form handling
  const [values, setValues] = useState({});

  const onChange = useCallback(
    (val, name) => {
      setValues({ ...values, [name]: val });
    },
    [values]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      const trip = firebase
        .database()
        .ref(`users/${user.uid}/trips`)
        .push(postProcessValues(values));
      history.push(`/trip/${trip.key}`);
    },
    [history, user.uid, values]
  );

  const duration = getDays(
    values.dates && values.dates[0],
    values.dates && values.dates[1]
  );

  const validation = useValidate(values);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Page>
      <Heading>Create trip</Heading>
      <form onSubmit={onSubmit}>
        <Question
          label="When is your trip?"
          name="dates"
          onChange={onChange}
          type="date-range"
          value={values.dates}
        />
        {duration >= LAUNDRY_MIN_DAYS && (
          <Question
            label="How long will you go between laundry trips?"
            max={duration}
            min={LAUNDRY_MIN_VALUE}
            name="laundry"
            onChange={onChange}
            type="number"
            unit="days"
            value={values.laundry}
          />
        )}
        <Question
          label="Business or pleasure?"
          name="type"
          onChange={onChange}
          options={["Business", "Pleasure", "Both"]}
          type="select"
          value={values.type}
        />
        <Question
          label="How many flights?"
          min={0}
          name="flights"
          onChange={onChange}
          type="number"
          value={values.flights}
        />
        {values.flights > 0 && (
          <Question
            label="How many flights are overnight?"
            max={values.flights}
            min={0}
            name="overnightFlights"
            onChange={onChange}
            type="number"
            value={values.overnightFlights}
          />
        )}
        <Question
          label="Activities"
          name="activities"
          onChange={onChange}
          options={activities}
          type="multiselect"
          value={values.activities}
        />
        <Button
          css={css`
            width: 100%;
          `}
          disabled={validation != null}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Page>
  );
}

// Validation

const MANDATORY_TEXT = "This field is mandatory";
const validators = {
  dates: v =>
    v == null || v[0] == null || v[1] == null ? MANDATORY_TEXT : null,
  laundry: (v, allValues) =>
    getDays(
      allValues.dates && allValues.dates[0],
      allValues.dates && allValues.dates[1]
    ) >= LAUNDRY_MIN_DAYS &&
    (v == null || v < LAUNDRY_MIN_VALUE)
      ? MANDATORY_TEXT
      : null,
  type: v => (v == null ? MANDATORY_TEXT : null),
  flights: v => (v == null || v < 0 ? MANDATORY_TEXT : null),
  overnightFlights: (v, allValues) =>
    allValues.flights > 0 && (v == null || v < 0) ? MANDATORY_TEXT : null
};

function useValidate(values) {
  const validation = Object.entries(validators)
    .map(([key, validate]) => [key, validate && validate(values[key], values)])
    .reduce((acc, [key, result]) => {
      if (result) {
        acc[key] = result;
      }
      return acc;
    }, {});

  return Object.keys(validation).length === 0 ? null : validation;
}

// Post-processing
function postProcessValues(values) {
  const v = { ...values };

  if (
    v.laundry &&
    v.laundry === getDays(v.dates && v.dates[0], v.dates && v.dates[1])
  ) {
    v.laundry = null;
  }

  return v;
}

export default CreateTrip;
