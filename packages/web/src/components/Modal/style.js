import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const modalIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Background = styled.section`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #0004;
  z-index: 10;
  animation: ${modalIn} 0.5s ease-in-out;
`;

const modalHeight = 200; /* px */
const modalWidth = 80; /* % */
const buttonWidth = 100; // px

const Modal = styled.div`
  position: absolute;
  display: block;
  max-width: ${modalWidth}%;
  height: auto;
  background-color: ${colors.MAIN};
  border-radius: 10px;
  box-shadow: 2px 2px 5px #000;
  color: ${colors.WHITE};
  z-index: 11;
  animation: ${modalIn} 0.5s ease-in-out;

  & h2 {
    font-size: larger;
    margin: 1.5rem 10% 0.2rem;
    text-align: center;
    white-space: normal;
  }

  & > div {
    margin: 0 auto;
    width: 500px;
    max-width: ${modalWidth * 0.8}%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const Button = styled.button`
   {
    background-color: ${colors.NEUTRAL};
    margin: 2em 0 1em;
    padding: 0.2rem 1rem;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #0008;
    position: relative;
    transition: width 0.2s ease-in-out, margin 0.2s ease-in-out;
    font-family: Poppins, sans-serif;
    width: ${buttonWidth}px;
    font-size: 18px;
    text-transform: capitalize;

    ${({ cancel }) => cancel && `background-color: ${colors.DELETE};`}

    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      top: 0;
      left: 0;
      box-shadow: 0 0 0 2px ${colors.WHITE};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    &:hover,
    &:focus {
      outline: none;
      &::after {
        opacity: 1;
      }
    }
  }
`;

export { Background, Modal, Button };
