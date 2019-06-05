import React from "react";

function Error({ error }) {
  console.error(error);

  return (
    <>
      <h1>
        {error.name}: {error.code}
      </h1>
      {error.message}
      <pre>{error.stack}</pre>
    </>
  );
}

export default Error;
