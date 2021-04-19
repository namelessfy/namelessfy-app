import styled from "styled-components";

const ResetButton = styled.button`
  margin: auto;
  max-width: 60%;
  width: auto;
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

export { ResetButton };
