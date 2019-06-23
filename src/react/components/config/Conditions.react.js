import styled from "@emotion/styled";
import React from "react";

import { Colors } from "../../../constants";
import { getConditionText } from "../../../utils";
import ConditionsDropdown from "./ConditionsDropdown.react";
import SmallButton from "./SmallButton.react";

const { useCallback, useEffect, useRef, useState } = React;

function Conditions({ activities, conditions, onChange }) {
  const dropdown = useRef();
  const [open, setOpen] = useState(false);

  // Close when another part of the document is interacted with
  const onInteraction = useCallback(e => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);
  useEffect(
    () => {
      if (open) {
        document.addEventListener("click", onInteraction);
        document.addEventListener("focusin", onInteraction);
        return () => {
          document.removeEventListener("click", onInteraction);
          document.removeEventListener("focusin", onInteraction);
        };
      }
    },
    [onInteraction, open]
  );

  const onAddCondition = useCallback(
    c => {
      onChange([...conditions, c]);
      setOpen(false);
    },
    [conditions, onChange]
  );

  const onRemoveCondition = useCallback(
    c => onChange(conditions.filter(co => co !== c)),
    [conditions, onChange]
  );

  return (
    <Root>
      {conditions.map((c, i) => (
        <ConditionButton key={i} onClick={() => onRemoveCondition(c)}>
          {getConditionText(c)}
        </ConditionButton>
      ))}
      <SmallButton
        invert={open}
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        +
      </SmallButton>
      {open && (
        <ConditionsDropdown
          activities={activities}
          conditions={conditions}
          onSelect={onAddCondition}
          ref={dropdown}
        />
      )}
    </Root>
  );
}

// Styles

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ConditionButton = styled.button`
  background: ${Colors.BackgroundDark};
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin-right: 4px;
  padding: 4px 8px;
  position: relative;

  &:first-of-type {
    margin-left: 4px;
  }

  &:hover {
    &::after {
      background: ${Colors.BackgroundDark};
      bottom: 0;
      content: "\u00D7";
      font-size: 24px;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

export default Conditions;
