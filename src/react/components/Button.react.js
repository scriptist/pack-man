import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { Colors } from "../../constants";

const Button = styled.button`
  background: none;
  border: 1px solid;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 16px 0;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s;
  width: 200px;

  &:hover {
    background: ${Colors.SubtleForeground};
  }
`;
export const LinkButton = Button.withComponent(Link);

export default Button;
