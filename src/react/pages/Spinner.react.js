import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";

import { Colors } from "../../constants";

const Size = 50;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${spinAnimation} 1s linear infinite;
  border: 5px solid ${Colors.SubtleForeground};
  border-top-color: currentColor;
  border-radius: 50%;
  height: ${Size}px;
  left: calc(50% - ${Size / 2}px);
  position: absolute;
  top: calc(50% - ${Size / 2}px);
  width: ${Size}px;
`;

export default Spinner;
