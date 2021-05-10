import React, { useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import {
  UserName,
  Statistics,
  ProfileImageDefault,
  ProfileContainer,
  EditButton,
  ViewButton,
} from "./styles";

import NavBar from "../Navbar";
import { CenterContent } from "../../styles/formStyles";
import UserNavBar from "./UserNavBar";
import { Icon } from "../../styles/mainStyles";

function UserProfile({ user, songs, favorites, playlists }) {
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
              user?.porfileImage ||
              "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
            }
          />
        </CenterContent>
        <UserName>
          <h1>{user?.userName}</h1>
          <h4>{user?.firstName + tab + user?.lastName}</h4>
        </UserName>
        <Statistics>
          <div>
            <p>{user?.followers || "3.141.596 Followers"}</p>
            <p>{user?.followers || "4 Following"}</p>
          </div>
          <ViewButton>
            <Icon
              onClick={toggleGrid}
              name={isGrid ? "toggleOn" : "toggleOff"}
              size="normal"
            />
            <Icon
              onClick={toggleGrid}
              name={isGrid ? "grid" : "list"}
              size="normal"
            />
          </ViewButton>
        </Statistics>
        <UserNavBar songs={songs} favSongs={favorites} playlists={playlists} />
      </ProfileContainer>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default UserProfile;
