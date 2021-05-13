import styled from "styled-components";
import * as colors from "../../styles/colors";

const SongImage = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  align-self: center;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: box-shadow 0.1s ease-in-out;
`;

export { SongImage };
