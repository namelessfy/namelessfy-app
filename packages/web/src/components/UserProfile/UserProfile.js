import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UserName,
  AddSongButton,
  MediaContainer,
  ProfileNav,
  Statistics,
  ViewButton,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
} from "./styles";
import { Main } from "../../styles/mainStyles";
import { CenterContent, PorfileImage } from "../EditUserForm/styles";
import { authSelector } from "../../redux/auth/auth-selectors";

function UserProfile() {
  const { currentUser } = useSelector(authSelector);

  return (
    <div>
      <Main>
        <ProfileContainer>
          <CenterContent>
            <ProfileImageDefault
              src={
                currentUser.porfileImage ||
                "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
              }
            />
          </CenterContent>
          <UserName>
            <h1>{currentUser.username}</h1>
            <h4>{currentUser.firstName}</h4>
          </UserName>
          <Statistics>
            <div>
              <p>3.141.596 Followers</p>
              <p>4 Following</p>
            </div>
            <ViewButton>Switch View</ViewButton>
          </Statistics>
          <ProfileNav>
            <p>Songs</p>
            <p>Albums</p>
            <p>Playlists</p>
          </ProfileNav>
          <hr />
          <ButtonContainer>
            <AddSongButton>Add Song</AddSongButton>
          </ButtonContainer>

          <MediaContainer>
            <div> Here is where the content is rendered</div>
          </MediaContainer>
        </ProfileContainer>
      </Main>
    </div>
  );
}

export default UserProfile;
