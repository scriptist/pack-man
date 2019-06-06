import React from "react";

import ConfigItem from "./ConfigItem.react";

const { useCallback } = React;

function ConfigCategory({ category, onChange }) {
  const createItem = useCallback(
    () => {
      const newCategory = {
        ...category,
        items: category.items ? [...category.items] : []
      };
      newCategory.items.push({
        count: 1,
        name: "",
        frequency: {
          number: 1,
          unit: "trip"
        },
        conditions: []
      });
      onChange(newCategory);
    },
    [category, onChange]
  );

  const updateItem = useCallback(
    (i, value) => {
      const newCategory = { ...category, items: [...category.items] };
      newCategory.items[i] = value;
      onChange(newCategory);
    },
    [category, onChange]
  );

  const deleteItem = useCallback(
    i => {
      const newCategory = { ...category, items: [...category.items] };
      newCategory.items.splice(i, 1);
      onChange(newCategory);
    },
    [category, onChange]
  );

  return (
    <div>
      <h2>{category.category}</h2>
      {(category.items || []).map((item, i) => (
        <ConfigItem
          item={item}
          key={i}
          onChange={v => updateItem(i, v)}
          onDelete={v => deleteItem(i)}
        />
      ))}
      <button onClick={createItem} type="button">
        +
      </button>
    </div>
  );
}

export default ConfigCategory;
