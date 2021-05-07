import styled from "styled-components";
import * as COLORS from "../../styles/colors";

const QueueContainer = styled.section`
  width: min(800px, 90%);
  margin: 0 auto;
  margin-top: 2rem;
`;
const SectionTitle = styled.h2`
  margin-left: 1rem;
  font-size: x-large;
  margin-top: 2rem;
`;
const SongList = styled.ul`
  width: 100%;
`;

const SongItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0008;
  width: 100%;
  height: 50px;
  background-color: ${COLORS.MAIN};
  margin: 0.5rem 0;
  justify-content: space-evenly;
`;

const SongTitle = styled.h3`
  font-size: large;
  width: 40%;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SongArtist = styled.div`
  width: 20%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > span + span:before {
    content: " ";
  }
  & > span:not(:last-child):after {
    content: ",";
  }
`;

const SongDuration = styled.div`
  width: 12.5%;
  text-align: center;
`;

const Icontainer = styled.div`
  width: 12.5%;
  text-align: center;
`;
export {
  QueueContainer,
  SectionTitle,
  SongList,
  SongItem,
  SongTitle,
  SongArtist,
  SongDuration,
  Icontainer,
};