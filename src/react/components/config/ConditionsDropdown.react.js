import styled from "@emotion/styled";
import React from "react";

import { Colors } from "../../../constants";
import { getConditionText } from "../../../utils";

const defaultConditions = [
  ["type", "Business"],
  ["type", "Pleasure"],
  ["laundry", true],
  ["laundry", false],
  ["flights", true],
  ["overnightFlights", true]
];

const ConditionsDropdown = React.forwardRef(({ conditions, onSelect }, ref) => (
  <Root ref={ref}>
    {defaultConditions.map((c, i) => (
      <ConditionButton
        condition={c}
        conditions={conditions}
        key={i}
        onSelect={onSelect}
      />
    ))}
  </Root>
));

// Helpers

function ConditionButton({ condition, conditions, onSelect }) {
  if (conditions.find(c => c[0] === condition[0])) {
    return null;
  }

  return (
    <Button onClick={() => onSelect(condition)} type="button">
      {getConditionText(condition)}
    </Button>
  );
}

// Styles

const Root = styled.div`
  background: ${Colors.BackgroundDark};
  right: 0;
  padding: 2px 0;
  position: absolute;
  top: 100%;
  width: 120px;
  z-index: 1;
`;

const Button = styled.button`
  background: ${Colors.BackgroundDark};
  border: 2px solid ${Colors.BackgroundDark};
  color: ${Colors.Foreground};
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  padding: 2px 4px;
  text-align: left;
  width: 100%;

  &:hover,
  &:focus {
    color: ${Colors.SubtleForeground};
  }
`;

export default ConditionsDropdown;
