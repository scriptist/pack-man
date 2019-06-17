import styled from "@emotion/styled";

const Heading = styled.h1`
  font-family: Comfortaa, sans-serif;
  font-size: 48px;
  font-weight: 300;
  margin: 32px 0;
`;

export const Heading2 = styled(Heading.withComponent("h2"))`
  font-size: 32px;
  margin: 32px 0 24px;
`;

export default Heading;
