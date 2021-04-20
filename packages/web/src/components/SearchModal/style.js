import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const Background = styled.section`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0004;
  z-index: 10;
`;

const Modal = styled.div`
  width: min(80%, 400px);
  height: 20vh;
  background-color: ${colors.MAIN};
  border-radius: 10px;
  box-shadow: 2 2 5px #0008;
  color: ${colors.WHITE};
  z-index: 11;

  & h2 {
    font-size: x-large;
    margin: 1rem;
  }

  & input {
    width: 80%;
    margin: 0 10%;
    height: 35px;
    color: ${colors.DARK};
    background-color: ${colors.SMOOTH};
    box-shadow: inset 2px 2px 10px #000;
    border-radius: 50px;
    border: none;
    outline: none;
    padding: 0 2em;
    font-size: large;
    font-weight: 500;

    &::placeholder {
      color: ${colors.DARK};
      opacity: 0.8;
    }
  }
`;

export { Background, Modal };
