import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(80%, 600px);
  margin: 2em auto;
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
    width: 270px;
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

const Login = styled.div`
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

export {
  Input,
  Label,
  Form,
  Button,
  Title,
  Separation,
  ForgotPassword,
  Login,
  Error,
  NamelessfyLogo,
};
