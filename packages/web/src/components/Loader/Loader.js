import React from "react";

import { Gif, Background } from "./styles";

import loader from "../../img/loader.gif";

function Loader() {
  return (
    <Background>
      <Gif src={loader} />
    </Background>
  );
}

export default Loader;
