import styled from "@emotion/styled";
import React from "react";

import { Colors } from "../../../constants";
import Conditions from "./Conditions.react";
import Frequency from "./Frequency.react";
import SmallButton from "./SmallButton.react";

const { useCallback } = React;

function Item({ activities, item, onChange, onDelete }) {
  const update = useCallback(
    (key, value) => onChange({ ...item, [key]: value }),
    [item, onChange]
  );

  return (
    <Row>
      <Frequency
        frequency={item.frequency}
        onChange={f => update("frequency", f)}
      />
      <CountField
        onChange={e => update("count", parseInt(e.target.value, 10))}
        type="number"
        value={item.count}
      />
      <NameField
        autoFocus={item.name === ""}
        onChange={e => update("name", e.target.value)}
        type="text"
        value={item.name}
      />
      <Conditions
        activities={activities}
        conditions={item.conditions || []}
        onChange={c => update("conditions", c)}
      />
      <SmallButton onClick={onDelete} type="button">
        &times;
      </SmallButton>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: 8px;
  width: 100%;
`;

const Field = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid ${Colors.BackgroundDark};
  color: inherit;
  font: inherit;
  width: 50px;
`;

const CountField = styled(Field)`
  padding: 0 8px;
  width: 32px;
`;

const NameField = styled(Field)`
  flex-grow: 1;
`;

export default Item;
