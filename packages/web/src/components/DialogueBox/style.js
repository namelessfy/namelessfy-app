import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const width = "200";
const buttonHeight = "50";

const click = keyframes`
  0%{
    background-color: ${colors.MAIN};
  }

  50%{
    background-color: ${colors.NEUTRAL};
  }

  100%{
    background-color: ${colors.MAIN};
  }
`;

const Container = styled.div`
  width: ${width}px;
  height: ${({ numberOfButtons }) => numberOfButtons * buttonHeight}px;
  position: absolute;
  background-color: ${colors.NEUTRAL};
  z-index: 6;
  border-radius: 0 10px 10px;
  box-shadow: 2px 2px 10px #0008;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ x }) => {
    if (window.innerWidth - width < x) {
      return `left: ${x - width}px;
              border-radius: 10px 0 10px 10px;`;
    }

    return `left: ${x}px;`;
  }}

  ${({ x, y, numberOfButtons }) => {
    if (window.innerHeight - numberOfButtons * buttonHeight < y) {
      if (window.innerWidth - width < x) {
        return `top: ${y - numberOfButtons * buttonHeight}px;
              border-radius: 10px 10px 0 10px;`;
      }
      return `top: ${y - numberOfButtons * buttonHeight}px;
              border-radius: 10px 10px 10px 0;`;
    }

    return `top: ${y}px;`;
  }}
`;

const DialogueButton = styled.button`
  width: 100%;
  height: ${buttonHeight}px;
  border: 2px solid ${colors.NEUTRAL};
  border-bottom: 2px solid ${colors.DARK};
  text-align: left;
  padding: 0 1rem;

  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border: 2px solid ${colors.NEUTRAL};
    border-radius: 0 0 10px 10px;
  }

  &:hover {
    background-color: ${colors.MAIN};
    border: 2px solid ${colors.SMOOTH};
  }
  &:focus {
    outline: none;
    animation: ${click} 0.2s ease-in-out;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 6;
  top: 0;
  left: 0;
`;

export { Container, DialogueButton, Background };
