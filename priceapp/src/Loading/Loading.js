import { ColorRing } from "react-loader-spinner";

import React from "react";

function Loading() {
  return (
    <ColorRing
      visible={true}
      height="23"
      width="23"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#fcfcfc", "#abbd81", "#849b87"]}
    />
  );
}

export default Loading;
