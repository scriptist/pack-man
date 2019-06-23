import styled from "@emotion/styled";
import React from "react";

import { Colors } from "../../../constants";
import SmallButton from "./SmallButton.react";

const { useCallback, useState } = React;

function Activities({ activities, onChange }) {
  const [newActivity, setNewActivity] = useState("");

  const onDelete = useCallback(
    activity => onChange(activities.filter(a => a !== activity)),
    [activities, onChange]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (newActivity) {
        onChange([...new Set([...activities, newActivity])].sort());
        setNewActivity("");
      }
    },
    [activities, newActivity, onChange]
  );

  return (
    <Root>
      {activities.map((activity, i) => (
        <Activity key={activity}>
          <Text>{activity}</Text>
          <SmallButton
            className="button"
            type="button"
            onClick={() => onDelete(activity)}
          >
            &times;
          </SmallButton>
        </Activity>
      ))}
      <Form onSubmit={onSubmit}>
        <NewActivityField
          onChange={e => setNewActivity(e.target.value)}
          value={newActivity}
        />
        <SmallButton
          className="button"
          disabled={newActivity === ""}
          type="submit"
        >
          +
        </SmallButton>
      </Form>
    </Root>
  );
}

// Styles

const Root = styled.div`
  align-self: flex-start;
  margin-top: 32px;
  max-width: 250px;
  width: 100%;
`;

const Activity = styled.div`
  align-items: center;
  display: flex;
`;

const Text = styled.div`
  flex-grow: 1;
`;

const Form = styled.form`
  display: flex;
`;

const NewActivityField = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid ${Colors.BackgroundDark};
  box-sizing: border-box;
  color: inherit;
  flex: 1 1 0;
  font: inherit;
  height: 41px;
  padding: 0 8px;
  width: 0;
`;

export default Activities;
