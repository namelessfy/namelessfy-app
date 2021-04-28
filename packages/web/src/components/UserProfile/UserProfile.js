import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  UserName,
  AddSongButton,
  Statistics,
  ViewButton,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
  EditButton,
} from "./styles";

import NavBar from "../Navbar";
import { CenterContent } from "../../styles/formStyles";
import { userSelector } from "../../redux/user/user-selectors";
import UserNavBar from "./UserNavBar";

function UserProfile() {
  const { currentUser } = useSelector(userSelector);
  const tab = " ";

  return (
    <div>
      <NavBar />
      <ProfileContainer>
        <CenterContent>
          <EditButton>
            <Link to="/edit-user"> Edit User</Link>
          </EditButton>
          <ProfileImageDefault
            src={
              currentUser?.porfileImage ||
              "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
            }
          />
        </CenterContent>
        <UserName>
          <h1>{currentUser?.userName}</h1>
          <h4>{currentUser?.firstName + tab + currentUser?.lastName}</h4>
        </UserName>
        <Statistics>
          <div>
            <p>{currentUser?.followers || "3.141.596 Followers"}</p>
            <p>{currentUser?.followers || "4 Following"}</p>
          </div>
          <ViewButton>Switch View</ViewButton>
        </Statistics>
        <ButtonContainer>
          <AddSongButton>Add Song</AddSongButton>
        </ButtonContainer>
        <UserNavBar />
      </ProfileContainer>
    </div>
  );
}

export default UserProfile;
