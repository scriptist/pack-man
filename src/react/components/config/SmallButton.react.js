import styled from "@emotion/styled";

import { Colors } from "../../../constants";

const Button = styled.button`
  background: none;
  border: none;
  color: ${Colors.BackgroundDark};
  cursor: pointer;
  font: inherit;
  font-size: 32px;
  width: 42px;

  &:hover {
    color: ${Colors.Foreground};
  }
`;

export default Button;
