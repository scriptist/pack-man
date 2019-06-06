import React from "react";

const { useCallback } = React;

function ConfigItem({ item, onChange, onDelete }) {
  const update = useCallback(
    (path, value) => {
      const pathArray = path.split(".");
      const newItem = { ...item };
      let cursor = newItem;
      pathArray.slice(0, -1).forEach(k => {
        cursor[k] = { ...cursor[k] };
        cursor = cursor[k];
      });
      cursor[pathArray[pathArray.length - 1]] = value;

      onChange(newItem);
    },
    [item, onChange]
  );

  return (
    <div>
      <input
        onChange={e => update("count", parseInt(e.target.value, 10))}
        type="number"
        value={item.count}
      />
      <input
        onChange={e => update("name", e.target.value)}
        type="text"
        value={item.name}
      />
      per{" "}
      <input
        onChange={e => update("frequency.number", parseInt(e.target.value, 10))}
        type="number"
        value={item.frequency.number}
      />
      <select
        onChange={e => update("frequency.unit", e.target.value)}
        value={item.frequency.unit}
      >
        {["trip", "day", "week", "flight", "overnight flight"].map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <button onClick={onDelete} type="button">
        &times;
      </button>
    </div>
  );
}

export default ConfigItem;
