import styled from "styled-components";
import * as colors from "../../styles/colors";

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


export { Title, Separation };
