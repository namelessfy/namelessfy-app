import styled from "styled-components";
import * as colors from "../../styles/colors";

const Back = styled.section`
  @media (min-width: 650px) {
    position: absolute;
    height: 100vh;
    right: 0;
    top: 0;
    background-color: #0004;
    ${({ isShowing }) =>
      isShowing
        ? `
      opacity: 1;
      width: 100vw;
      z-index: 2;
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out;
  `
        : `opacity: 0; 
      width: 10vw; 
      z-index: -1; 
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;`}
  }
`;

const Background = styled.section`
  position: absolute;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    ${colors.MAIN} 0%,
    ${colors.DARK} 100%
  );
  right: 0;
  transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;
  overflow-x: hidden;

  ${({ isShowing }) =>
    isShowing
      ? `
      opacity: 1;
      width: 100vw;
      z-index: 2;
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out;
  `
      : `opacity: 0; width: 10vw; 
      z-index: -1; 
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;`}

  @media (min-width: 650px) {
    box-shadow: 2px 2px 15px #0008;
    border-radius: 10px 0 0 10px;

    ${({ isShowing }) =>
      isShowing
        ? `
      opacity: 1;
      width: 600px;
  `
        : `opacity: 0; width: 10vw;`}
  }
`;

export { Background, Back };
