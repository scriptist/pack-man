import styled from "@emotion/styled";

import { Colors } from "../../../constants";

const SmallButton = styled.button`
  background: ${props => (props.invert ? Colors.BackgroundDark : "none")};
  border: none;
  color: ${props => (props.invert ? Colors.Foreground : Colors.BackgroundDark)};
  font: inherit;
  font-size: 32px;
  width: 42px;

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      color: ${Colors.Foreground};
    }
  }
`;

export default SmallButton;
