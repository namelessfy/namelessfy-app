import styled from "styled-components";
import * as colors from "../../styles/colors";

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  * {
    text-align: center;
  }

  h1 {
    font-size: 40px;
    letter-spacing: 5px;
  }
  h4 {
    font-size: 12px;
    color: ${colors.NEUTRAL};
    margin-top: -10px;
  }
`;

const ProfileContainer = styled.div`
  width: 80%;
  margin: auto;
  font-family: Poppins, sans-serif;
`;
const Statistics = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  * {
    text-align: left;
    font-size: 15px;
  }
`;

const ViewButton = styled.button`
  width: auto;
`;

const ProfileNav = styled.div`
  display: flex;
  flex-direction: row, wrap;
  justify-content: space-evenly;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row wrap;
  justify-content: center;
`;
const AddSongButton = styled.button`
  background-color: ${colors.NEUTRAL};
  color: ${colors.WHITE};
  font-weight: 400;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  width: 40vw;
  max-width: 200px;
`;

const MediaContainer = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: row wrap;
`;

const ProfileImageDefault = styled.div`
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
  transition: box-shadow 0.1s ease-in-out;
`;

export {
  UserName,
  Statistics,
  ViewButton,
  ProfileNav,
  AddSongButton,
  MediaContainer,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
};
