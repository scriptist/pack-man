import styled from "@emotion/styled";
import React from "react";

function Activities({ activities }) {
  return (
    <Root>
      <ul>
        {activities.map((activity, i) => (
          <li>{activity}</li>
        ))}
      </ul>
      <pre>Not yet editable. Ask Mike to modifify the db for you ;)</pre>
    </Root>
  );
}

// Styles

const Root = styled.div`
  width: 100%;
`;

export default Activities;
