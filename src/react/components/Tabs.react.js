import React from "react";
import styled from "@emotion/styled";

import { Colors } from "../../constants";

function Tabs({ onChange, selected, tabs }) {
  return (
    <Root>
      {tabs.map(tab => (
        <Tab
          key={tab}
          onClick={() => onChange(tab)}
          selected={tab === selected}
        >
          {tab}
        </Tab>
      ))}
    </Root>
  );
}

// Styles

const Root = styled.div`
  border-bottom: 2px solid ${Colors.BackgroundDark};
  width: 100%;
`;

const Tab = styled.button`
  background: ${props => (props.selected ? Colors.BackgroundDark : "none")};
  border: none;
  color: inherit;
  cursor: ${props => (props.selected ? null : "pointer")};
  font: inherit;
  padding: 8px 16px;
`;

export default Tabs;
