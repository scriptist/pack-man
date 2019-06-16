import styled from "@emotion/styled";
import React from "react";

import { Colors, FreqUnits } from "../../../constants";

const { useCallback, useEffect, useRef, useState } = React;

function Item({ frequency, onChange }) {
  const { number, unit } = frequency;

  useEnforceTripValue(frequency, onChange);

  const [open, setOpen] = useState(false);

  // Close on blur
  const { isFocused, ...focusProps } = useFocus();
  const wasFocused = useRef(isFocused);
  useEffect(
    () => {
      if (wasFocused.current && !isFocused && open) {
        setOpen(false);
      }
      wasFocused.current = isFocused;
    },
    [isFocused, open]
  );

  // Update values
  const update = useCallback(
    (key, value) => onChange({ ...frequency, [key]: value }),
    [frequency, onChange]
  );

  return (
    <Root>
      <Button onClick={() => setOpen(true)} type="button">
        /{number === 1 ? "" : number}
        {unit.charAt(0)}
      </Button>
      {open && (
        <Popup>
          {unit !== FreqUnits.Trip && (
            <NumberField
              onChange={e => update("number", parseInt(e.target.value, 10))}
              type="number"
              value={number}
              {...focusProps}
            />
          )}
          <UnitField
            autoFocus
            onChange={e => update("unit", e.target.value)}
            value={unit}
            {...focusProps}
          >
            {Object.values(FreqUnits).map(o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </UnitField>
        </Popup>
      )}
    </Root>
  );
}

// Hooks
// When unit is 'trip', number must be '1'
function useEnforceTripValue(frequency, onChange) {
  const { number, unit } = frequency;

  useEffect(
    () => {
      const tripValue = 1;
      if (unit === FreqUnits.Trip && number !== tripValue) {
        onChange({ number: tripValue, unit });
      }
    },
    [number, unit, onChange]
  );
}

// Maintain a boolean focus state across a multiple inputs
const FOCUS_TIMEOUT = 100;
function useFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const timeout = useRef();

  const onBlur = useCallback(() => {
    timeout.current = setTimeout(() => {
      setIsFocused(false);
    }, FOCUS_TIMEOUT);
  }, []);

  const onFocus = useCallback(() => {
    setIsFocused(true);
    clearTimeout(timeout.current);
  }, []);

  return { isFocused, onFocus, onBlur };
}

// Styles

const Root = styled.div`
  flex: 0 0 48px;
  position: relative;
`;

const Button = styled.button`
  background: ${Colors.BackgroundDark};
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  height: 100%;
  padding: 0;
  width: 100%;
`;

const Popup = styled.div`
  background: ${Colors.BackgroundDark};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  white-space: nowrap;
`;

const Field = styled.input`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 8px;
`;

const NumberField = styled(Field)`
  width: 50px;
`;

const UnitField = styled(Field.withComponent("select"))``;

export default Item;
