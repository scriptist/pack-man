/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import uuidv4 from "uuid/v4";

const { useCallback, useMemo, useRef } = React;

function Question({ label, ...props }) {
  const uuid = useMemo(() => uuidv4(), []);

  return (
    <div
      css={css`
        margin-bottom: 48px;
        max-width: 420px;
      `}
    >
      <Label htmlFor={uuid}>{label}</Label>
      <Fields uuid={uuid} {...props} />
    </div>
  );
}

// Helpers
function Fields({
  name,
  options,
  onChange: onChangeProp,
  type,
  unit,
  uuid,
  value,
  ...props
}) {
  const onChange = useCallback(
    e => {
      let v;

      switch (type) {
        case "multiselect":
          v = Array.from(e.target.selectedOptions).map(o => o.value);
          break;
        case "number":
          v = parseInt(e.target.value, 10);
          break;
        case "date-range":
          v = e;
          break;
        default:
          v = e.target.value;
      }

      onChangeProp(v, name);
    },
    [name, onChangeProp, type]
  );

  switch (type) {
    case "date-range":
      return (
        <DateRangeInput
          onChange={onChange}
          uuid={uuid}
          value={value}
          {...props}
        />
      );
    case "number":
      return (
        <React.Fragment>
          <input
            css={inputCss}
            id={uuid}
            onChange={onChange}
            type="number"
            value={Number.isFinite(value) ? value : ""}
            {...props}
          />
          {unit}
        </React.Fragment>
      );
    case "select":
    case "multiselect":
      const multiple = type === "multiselect";
      return (
        <select
          css={inputCss}
          id={uuid}
          multiple={multiple}
          onChange={onChange}
          value={value || (multiple ? [] : "")}
          {...props}
        >
          {!multiple && !options.includes(value) && <option />}
          {options.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    default:
      throw new Error("Unexpected item in bagging area");
  }
}

function DateRangeInput({ onChange: onChangeProp, uuid, value }) {
  const from = useRef();
  const to = useRef();

  const onChange = useCallback(
    e => {
      if (from.current && to.current) {
        onChangeProp([from.current.value || null, to.current.value || null]);
      }
    },
    [onChangeProp]
  );

  return (
    <div>
      <input
        css={inputCss}
        id={uuid}
        onChange={onChange}
        max={value && value[1]}
        ref={from}
        type="date"
        value={(value && value[0]) || ""}
      />
      <input
        css={inputCss}
        min={value && value[0]}
        onChange={onChange}
        ref={to}
        type="date"
        value={(value && value[1]) || ""}
      />
    </div>
  );
}

const inputCss = css`
  background: transparent;
  border: none;
  border-bottom: 2px solid;
  box-sizing: border-box;
  color: inherit;
  font: inherit;
  font-size: 20px;
  padding: 4px 0;
  width: calc(50% - 10px);

  &:not(:focus),
  select& {
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }

  select&[multiple] {
    height: 136px;
    overflow: auto;
  }
`;

const Label = styled.label`
  display: block;
  font-family: Comfortaa, sans-serif;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 12px;
`;

export default Question;
