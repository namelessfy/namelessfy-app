import styled from "styled-components";
import * as colors from "../../styles/colors";
import closeIcon from "../../img/close.svg";

const Tag = styled.li`
  background-color: ${colors.NEUTRAL};
  width: fit-content;
  padding: 0.2rem 0 0.2rem 2rem;
  border-radius: 10px;
  font-size: large;
  margin: 0.5rem;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const CloseButton = styled.button`
  width: 22px;
  height: 22px;
  background: url("${closeIcon}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position center;
  margin: 0;
  padding: 0 3rem 0 1rem;
  transition: opacity 0.2s ease-in-out;
  outline: none;

  &:hover, &:focus{
    outline: none;
    opacity: 0.7;
  }
`;

export { Tag, TagList, CloseButton };
