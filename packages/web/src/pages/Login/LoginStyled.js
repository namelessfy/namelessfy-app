import styled from "styled-components";

const Wrapper = styled.div`
  background: linear-gradient(127.21deg, #182628 0%, #0c1314 99.51%);
  border: 1px solid white;
  margin: auto;
  padding: auto;
  width: 40%;
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

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  color: white;
  margin: 30px auto;
`;

const Input = styled.input`
  margin: 15px auto;
  width: 50%;
  background-color: #7f7f7f;
  color: white;

  ::placeholder {
    color: white;
    opacity: 0.8;
  }

  &:hover {
    color: white;
    background-color: #565656;
    ::placeholder {
      opacity: 1;
    }
  }

  &:focus {
    border: 3px solid white;
  }
`;

const LoginButton = styled.button`
  margin: auto;
  width: 50%;
  background: white;
  color: black;
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: black;
  }

  &:focus {
    border: 3px solid white;
  }
`;

const SocialButton = styled.button`
  margin: 10px auto;
  width: 60%;
  color: white;
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid white;

  &:hover {
    background-color: white;
    color: black;
  }

  &:focus {
    border: 3px solid white;
  }
`;

export { ColumnDiv, Form, Input, RowDiv, LoginButton, SocialButton };
