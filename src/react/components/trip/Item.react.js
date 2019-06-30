import styled from "@emotion/styled";
import { css } from "@emotion/core";
import React from "react";

function Item({ checked, count, name, onChange }) {
  return (
    <Container checked={checked} onClick={() => onChange(name, !checked)}>
      <Count>{count}&times;</Count>
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: block;
  font: inherit;
  font-size: 22px;
  line-height: 1.6;

  ${props =>
    props.checked
      ? css`
          opacity: 0.5;
          text-decoration: line-through;
        `
      : null}

  &:focus {
    outline: 1px dashed white;
  }
`;

const Count = styled.span`
  display: inline-block;
  width: 42px;
`;

const Name = styled.span``;

export default Item;
