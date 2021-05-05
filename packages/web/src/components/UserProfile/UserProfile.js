import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  UserName,
  Statistics,
  ViewButton,
  ProfileImageDefault,
  ProfileContainer,
  EditButton,
} from "./styles";

import NavBar from "../Navbar";
import { CenterContent } from "../../styles/formStyles";
import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import UserNavBar from "./UserNavBar";
import { Icon } from "../../styles/mainStyles";

function UserProfile() {
  const { currentUser } = useSelector(userSelector);
  const { mySongs } = useSelector(songSelector);
  const { myPlaylists } = useSelector(playlistSelector);
  const [isGrid, setIsGrid] = useState(true);
  const tab = " ";

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  return (
    <div>
      <NavBar />
      <ProfileContainer>
        <CenterContent>
          <EditButton>
            <Link to="/edit-user">
              {" "}
              <Icon name="edit" size="normal" />
            </Link>
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
          <ViewButton onClick={toggleGrid}>
            <Icon name={isGrid ? "toggleOn" : "toggleOff"} size="normal" />
            <Icon name={isGrid ? "grid" : "list"} size="normal" />
          </ViewButton>
        </Statistics>
        <UserNavBar songs={mySongs} playlists={myPlaylists} />
      </ProfileContainer>
    </div>
  );
}

export default UserProfile;
