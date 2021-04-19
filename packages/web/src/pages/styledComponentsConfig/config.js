import React from "react";
import styled from "styled-components";

const backgroundGreen = "#57BA98";
const darkGreen = "#3B945E";

const baseColors = { backgroundGreen, darkGreen };

const Wrapper = styled.div`
  background: linear-gradient(127.21deg, #182628 0%, #0c1314 99.51%);
  border: 1px solid white;
  margin: auto;
  padding: auto;
  width: auto;
  max-width: 80%;
  min-width: 60%;
  height: auto;
  * {
    padding: 5px;
    text-align: center;
  }
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
`;

const RowDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const Logo = styled.div``;
export { baseColors, Wrapper, ColumnDiv, RowDiv, Logo };
