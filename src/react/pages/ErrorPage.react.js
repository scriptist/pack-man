import React from "react";

import Heading from "../components/Heading.react";

function ErrorPage({ error }) {
  console.error(error);

  return (
    <>
      <Heading back>
        {error.name}: {error.code}
      </Heading>
      {error.message}
      <pre>{error.stack}</pre>
    </>
  );
}

export default ErrorPage;
