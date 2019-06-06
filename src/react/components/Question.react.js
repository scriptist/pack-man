import React from "react";

const { useCallback, useRef } = React;

function Question({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <Fields {...props} />
    </div>
  );
}

// Helpers
function Label({ children }) {
  if (children == null) {
    return null;
  }

  return <div>{children}</div>;
}

function Fields({
  name,
  options,
  onChange: onChangeProp,
  type,
  unit,
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
      return <DateRangeInput onChange={onChange} value={value} {...props} />;
    case "number":
      return (
        <>
          <input
            onChange={onChange}
            type="number"
            value={Number.isFinite(value) ? value : ""}
            {...props}
          />
          {unit}
        </>
      );
    case "select":
    case "multiselect":
      const multiple = type === "multiselect";
      return (
        <select
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

function DateRangeInput({ onChange: onChangeProp, value }) {
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
    <>
      <input
        onChange={onChange}
        ref={from}
        type="date"
        value={(value && value[0]) || ""}
      />
      <input
        onChange={onChange}
        ref={to}
        type="date"
        value={(value && value[1]) || ""}
      />
    </>
  );
}

export default Question;
