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

const EditButton = styled.button`
  margin-top: 10px;
  margin-left: 80%;
  padding: 5px;
  border: 1px solid white;
  border-radius: 5px;
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

const NavContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  max-width: 80%;
  margin: 25px auto;
  margin-top: 20px;
  button {
    padding: 5px 10px;
    letter-spacing: 1px;
    border-radius: 5px;
    &:hover {
      background: #2e3530;
    }

    &:focus {
      background: linear-gradient(to bottom right, black, gray);
    }
  }
`;

const MediaContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  max-width: 80%;
  margin: 0 auto;
  div {
  }
`;

const Media = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 200px;
  border: 1px solid white;
  justify-content: space-around;
`;

const ProfileImageDefault = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 50%;
  padding: min(40%, 150px);
  margin: 1em 0;
  align-self: center;
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  transition: box-shadow 0.1s ease-in-out;
  background-image: url(${(props) =>
    props.src ||
    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"});
`;

export {
  UserName,
  Statistics,
  ViewButton,
  AddSongButton,
  NavContainer,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
  EditButton,
  Media,
  MediaContainer,
};
