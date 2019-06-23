import styled from "@emotion/styled";

import { Colors } from "../../../constants";

const SmallButton = styled.button`
  background: ${props => (props.invert ? Colors.BackgroundDark : "none")};
  border: none;
  color: ${props => (props.invert ? Colors.Foreground : Colors.BackgroundDark)};
  cursor: pointer;
  font: inherit;
  font-size: 32px;
  width: 42px;

  &:hover {
    color: ${Colors.Foreground};
  }
`;

export default SmallButton;
