import styled, { keyframes } from "styled-components";

import * as colors from "./colors";

import addPhotoIcon from "../img/add_a_photo_black_24dp.svg";

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

const CoverImage = styled(PorfileImage)`
  border-radius: 10px;

  &::after {
    border-radius: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  box-shadow: inset 2px 2px 10px #000000;
  background: ${colors.WHITE};
  font-family: Poppins, sans-serif;
  font-weight: 400;
  padding-left: 1em;
  color: ${colors.DARK};
  border: 2px solid ${colors.DARK};

  &:hover {
    --tw-ring-shadow: none;
    outline: none;
    border: 2px solid ${colors.WHITE};
  }
  &:focus {
    --tw-ring-shadow: none;
    outline: none;
    border: 2px solid ${colors.DARK};
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

const Button = styled.button`
  background-color: ${colors.NEUTRAL};
  margin: 2em 0 1em;
  padding: 0.5em 0;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0008;
  position: relative;
  align-self: center;
  transition: width 0.2s ease-in-out;
  font-family: Poppins, sans-serif;
  width: min(100%, 250px);
  outline: none;

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
    width: 270px;
    outline: none;
    &::after {
      opacity: 1;
    }
  }
  @media (max-width: 1024px) {
    font-size: 18px;
    &:hover,
    &:focus {
      width: 250px;
      &::after {
        opacity: 1;
      }
    }
  }

  ${({ lastItem }) =>
    lastItem
      ? `
    margin-bottom: 100px;
    @media (max-width: 650px) {
      margin-bottom: 150px;};`
      : ``}
`;

const DeleteButton = styled(Button)`
  background-color: ${colors.DELETE};
`;

const Title = styled.h1`
  width: min(90%, 700px);
  font-size: 32px;
  margin: 2em auto 0;
  text-align: center;
`;

const Separation = styled.hr`
  width: min(85%, 700px);
  color: ${colors.WHITE};
  margin: 0 auto;
`;

const ForgotPassword = styled.span`
  font-size: 14px;
  margin-right: 0.5rem;
  text-align: right;
  & > div {
    display: inline-block;
    & > a {
      color: ${colors.LIGHT};
      margin-left: 0.5rem;

      &:hover {
        text-decoration: underline;
        color: ${colors.SMOOTH};
      }
    }
  }
`;

const RedirectMessage = styled.div`
  margin: 2rem auto;
  width: fit-content;
  max-width: 80%;
  font-size: 14px;
  text-align: center;
  & > div {
    display: inline-block;
    & > a {
      dispaly: block;
      color: ${colors.LIGHT};
      margin-left: 0.5rem;

      &:hover {
        text-decoration: underline;
        color: ${colors.SMOOTH};
      }
    }
  }
  @media (min-width: 1024px) {
    font-size: 16px;
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

const ErrorInput = styled.div`
  font-size: 12px;
  margin-left: 0.5em;
  color: ${colors.LIGHT};
  animation: ${errorAnimation} 2s linear;
`;

const NamelessfyLogo = styled.div`
  width: 250px;
  height: 200px;
  background: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position center;
  margin: 3rem auto -1rem;
  filter: drop-shadow( 3px 3px 5px #000);

  @media (max-width: 512px) {
    width: 200px;
  height: 150px;
  }
  @media (max-width: 420px) {
    width: 150px;
  height: 100px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AddInput = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  padding-left: 1em;
  box-shadow: inset 2px 2px 10px #000000;
  background: ${colors.WHITE};
  border: 2px solid ${colors.DARK};

  &:hover {
    border: 2px solid ${colors.WHITE};
  }
  &:focus {
    border: 2px solid ${colors.DARK};
  }

  & input {
    padding: 0;
    border: none;
    background-color: transparent;
    width: calc(100% - 150px);
    height: 100%;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    color: ${colors.DARK};

    @media (max-width: 360px) {
      width: calc(100% - 100px);
    }

    &:hover {
      --tw-ring-shadow: none;
      outline: none;
    }
    &:focus {
      --tw-ring-shadow: none;
      outline: none;
    }
  }

  & button {
    margin: 0;
    width: 150px;
    padding: 0.3rem;

    &:hover {
      outline: none;
      width: 150px;
    }
    &:focus {
      outline: none;
      width: 150px;
    }

    @media (max-width: 360px) {
      width: 100px;

      &:hover {
        width: 100px;
      }
      &:focus {
        width: 100px;
      }
    }
  }
`;

export {
  Button,
  CenterContent,
  DeleteButton,
  Error,
  ErrorInput,
  ForgotPassword,
  Form,
  Input,
  Label,
  RedirectMessage,
  NamelessfyLogo,
  PorfileImage,
  Separation,
  Title,
  CoverImage,
  AddInput,
};
