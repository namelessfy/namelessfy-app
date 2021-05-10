import styled from "styled-components";
import * as colors from "../../styles/colors";

const PlaylistContainer = styled.div`
  width: min(100%, 800px);
  height: 100px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;

  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    outline: none;
    border: 2px solid ${colors.WHITE};
  }
`;

const PlaylistTitle = styled.h2`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: x-large;
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background: linear-gradient(to top, #0008, #0000);
`;

export { PlaylistContainer, PlaylistTitle };
