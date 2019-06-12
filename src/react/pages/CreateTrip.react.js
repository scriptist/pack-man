import React from "react";

import firebase from "../../firebase";
import { getDays } from "../../utils";
import Button from "../components/Button.react";
import Heading from "../components/Heading.react";
import Page from "../components/Page.react";
import Question from "../components/Question.react";

const { useCallback, useState } = React;

function CreateTrip({ history, user }) {
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
        .push(values);
      history.push(`/trip/${trip.key}`);
    },
    [history, user.uid, values]
  );

  const duration = getDays(
    values.dates && values.dates[0],
    values.dates && values.dates[1]
  );

  return (
    <Page>
      <Heading>Create trip</Heading>
      <form onSubmit={onSubmit}>
        <Question
          name="dates"
          onChange={onChange}
          type="date-range"
          value={values.dates}
        />
        {duration > 6 && (
          <Question
            label="How long will you go between laundry trips?"
            max={duration}
            min={3}
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
          options={["Drive", "Gym", "Swim", "Friends", "Recruiting"]}
          type="multiselect"
          value={values.activities}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Page>
  );
}

export default CreateTrip;
