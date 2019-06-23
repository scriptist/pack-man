import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

import { Colors } from "../../constants";

function Heading({ back, children }) {
  return (
    <HeadingStyle>
      {back && <Back to="/">&larr;</Back>}
      {children}
    </HeadingStyle>
  );
}

const HeadingStyle = styled.h1`
  font-family: Comfortaa, sans-serif;
  font-size: 48px;
  font-weight: 300;
  margin: 32px 0;
  position: relative;
  text-align: center;
  width: 100%;
`;

const Back = styled(Link)`
  background: none;
  border: none;
  color: ${Colors.SubtleForeground};
  font: inherit;
  font-size: 42px;
  left: 0;
  line-height: 48px;
  padding: 0 8px;
  position: absolute;
  text-decoration: inherit;
  top: 0;

  &:hover {
    color: ${Colors.Foreground};
  }
`;

export const Heading2 = styled(HeadingStyle.withComponent("h2"))`
  font-size: 32px;
  margin: 32px 0 24px;
`;

export default Heading;
