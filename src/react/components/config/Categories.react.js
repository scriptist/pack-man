import React from "react";

import Category from "./Category.react";

const { useCallback } = React;

function Categories({ activities, categories, onChange }) {
  const updateCategory = useCallback(
    (i, value) => {
      const newCategories = [...categories];
      newCategories[i] = value;
      onChange(newCategories);
    },
    [categories, onChange]
  );

  return categories.map((category, i) => (
    <Category
      activities={activities}
      category={category}
      key={i}
      onChange={v => updateCategory(i, v)}
    />
  ));
}

export default Categories;
