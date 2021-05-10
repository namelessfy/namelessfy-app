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
    font-size: 18px;
    color: ${colors.NEUTRAL};
  }
`;

const ProfileContainer = styled.div`
  width: min(100vw, 1000px);
  margin: auto;
  font-family: Poppins, sans-serif;
`;
const Statistics = styled.div`
  max-width: 250px;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  * {
    text-align: left;
    font-size: 16px;
  }
  @media (max-width: 290px) {
    flex-direction: column;
    justify-content: center;
    * {
      text-align: center;
      font-size: 18px;
    }
  }
`;

const ProfileButton = styled.button`
  margin-top: 10px;
  margin-left: 80%;
  padding: 5px;
  * {
    display: block;
    position: relative;
    right: 80px;
    height: 40px;
    width: auto;
    transition: 0.3s ease-in-out;
  }
`;
const ViewButton = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 70px;
  }

  @media (max-width: 290px) {
    margin: 1rem auto;
  }
`;

const EditButton = styled.div`
  margin-top: 25px;
  margin-left: calc(50% + min(20%, 75px));
  padding: 5px;

  &:hover,
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row wrap;
  justify-content: center;
  width: 100%;
  & > button {
    margin-top: 1rem;
  }
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
  width: 100%;
  margin: 25px auto;
  margin-top: 4rem;

  & > button + button {
    border-left: 2px solid ${colors.WHITE};
  }
`;

const NavButton = styled.button`
  ${({ selected }) =>
    `color: ${selected ? colors.LIGHT : colors.WHITE}; 
    ${selected && `font-weight: bold;`}`};
  width: calc(100% / 3);
  letter-spacing: 1px;
  &:hover,
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 1rem;

  & > div {
    margin-bottom: 1.5rem;
  }

  & > div + div {
    margin-left: 1.5rem;
  }

  & > div:nth-child(5n + 1) {
    margin-left: 0rem;
  }
  @media (max-width: 1000px) {
    padding: 0 1.5rem;
  }
  @media (max-width: 800px) {
    padding: 0 2rem;
    & > div:nth-child(5n + 1) {
      margin-left: 1.5rem;
    }
    & > div:nth-child(4n + 1) {
      margin-left: 0rem;
    }
  }
  @media (max-width: 620px) {
    & > div + div {
      margin-left: 1rem;
    }
    & > div:nth-child(5n + 1) {
      margin-left: 1rem;
    }
    & > div:nth-child(4n + 1) {
      margin-left: 0rem;
    }
  }
  @media (max-width: 500px) {
    padding: 0 1rem;
    & > div + div {
      margin-left: 0.5rem;
    }
    & > div:nth-child(5n + 1) {
      margin-left: 0.5rem;
    }
    & > div:nth-child(4n + 1) {
      margin-left: 0rem;
    }
  }
  @media (max-width: 350px) {
    & > div:nth-child(4n + 1) {
      margin-left: 0.5rem;
    }
    & > div:nth-child(3n + 1) {
      margin-left: 0rem;
    }
  }
`;

const Media = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 200px;
  border: 1px solid white;
  /* justify-content: space-around; */
`;

const ProfileImageDefault = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 50%;
  padding: min(30%, 150px);
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
  AddSongButton,
  NavContainer,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
  Media,
  MediaContainer,
  ProfileButton,
  NavButton,
  EditButton,
  ViewButton,
};
