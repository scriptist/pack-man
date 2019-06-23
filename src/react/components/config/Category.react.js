import styled from "@emotion/styled";
import React from "react";

import Item from "./Item.react";
import SmallButton from "./SmallButton.react";
import { Heading2 } from "../Heading.react";

const { useCallback } = React;

function Category({ activities, category, onChange }) {
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
    <Root>
      <Heading2>{category.category}</Heading2>
      {(category.items || []).map((item, i) => (
        <Item
          activities={activities}
          item={item}
          key={i}
          onChange={v => updateItem(i, v)}
          onDelete={v => deleteItem(i)}
        />
      ))}
      <SmallButton onClick={createItem} type="button">
        +
      </SmallButton>
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
`;

export default Category;
