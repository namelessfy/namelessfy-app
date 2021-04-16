import styled, { keyframes } from "styled-components";
import addPhotoIcon from "../../img/add_a_photo_black_24dp.svg";
import * as colors from "../../styles/colors";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(80%, 600px);
  margin: 2em auto;
`;

const PorfileImage = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 50%;
  padding: min(40%, 150px);
  margin: 1em 0;
  align-self: center;
  background-image: url(${(props) =>
    props.src ||
    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"});
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &::before {
    content: "";
    background: url("${addPhotoIcon}");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
    position: absolute;
    display: block;
    height: min(30%, 50px);
    width: min(30%, 50px);
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    fill: white;
    transition: opacity 0.2s ease-in-out;
  }

  &::after {
    content: "";
    z-index: 1;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
  }

  &:hover,
  &:focus {
    box-shadow: 0px 0px 0 2px ${colors.WHITE};
  }

  @media (min-width: 1025px) {
    &::before {
      opacity: 0.5;
    }

    &:hover,
    &:focus {
      &::before {
        opacity: 1;
      }
    }
  }
`;

const PorfileInput = styled.input`
  width: 100%;
  border-radius: 10px;
  box-shadow: inset 2px 2px 10px #000000;
  background: ${colors.WHITE};
  font-family: Poppins, sans-serif;
  font-weight: 400;
  padding-left: 1em;
  color: ${colors.DARK};
  border: 2px solid ${colors.DARK};

  &:hover,
  &:focus {
    --tw-ring-shadow: none;
    outline: none;
    border: 2px solid ${colors.WHITE};
  }

  ${(props) =>
    props.display
      ? `
    display: ${props.display}`
      : ``};

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const Label = styled.label`
  margin-left: 0.5em;
  margin-top: 1em;
  color: ${colors.WHITE};
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${colors.NEUTRAL};
  margin: 2em 0 1em;
  padding: 0.5em 5em;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0008;
  position: relative;
  align-self: center;
  transition: padding 0.2s ease-in-out;
  font-family: Poppins, sans-serif;

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
    padding: 0.5em 6em;
    &::after {
      opacity: 1;
    }
  }
`;

const errorAnimation = keyframes`
  0%, 50% {
    color: ${colors.LIGHT};
  }

  100% {
    color: ${colors.WHITE};
  }
`;

const Error = styled.div`
  margin: 2rem auto;
  width: fit-content;
  max-width: 80%;
  font-size: 14px;
  text-align: center;
  animation: ${errorAnimation} 2s linear;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

export { PorfileImage, PorfileInput, Label, Form, CenterContent, Button, Error };
