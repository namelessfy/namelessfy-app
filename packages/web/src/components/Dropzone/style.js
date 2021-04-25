import styled from "styled-components";
import * as colors from "../../styles/colors";

const Background = styled.section`
  background-color: ${colors.DARK};
  height: 150px;
  border-radius: 10px;
  margin-top: 2rem;
  border: 2px dashed ${colors.WHITE}88;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: inset 2px 2px 10px #0008;
  outline: none;

  &:hover,
  &:focus {
    border: 2px dashed ${colors.WHITE};
    box-shadow: 2px 2px 10px #0008;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;

  & p {
    width: fit-content;
    margin: 0 2rem;
    text-align: center;
    font-size: large;
    color: ${colors.WHITE}cc;
    transition: all 0.2s ease-in-out;
  }

  &:hover > p,
  &:focus > p {
    color: ${colors.WHITE};
  }
`;

const Aside = styled.aside`
  margin-top: 1rem;
`;

export { Background, Container, Aside };
