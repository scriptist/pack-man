import styled from "@emotion/styled";
import React from "react";

function Item({ count, name }) {
  return (
    <Container>
      <Count>{count}&times;</Count>
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled.li`
  line-height: 1.6;
  font-size: 22px;
`;

const Count = styled.span`
  display: inline-block;
  width: 42px;
`;

const Name = styled.span``;

export default Item;
