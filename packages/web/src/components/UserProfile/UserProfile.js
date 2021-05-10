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
  FollowButton,
} from "./styles";

import NavBar from "../Navbar";
import { CenterContent } from "../../styles/formStyles";
import UserNavBar from "./UserNavBar";
import { Icon } from "../../styles/mainStyles";

function UserProfile({ user, songs, favorites, playlists, isCurrentUser }) {
  const [isGrid, setIsGrid] = useState(true);
  const [ isFollowed, setIsFollowed ] = useState(false);
  const tab = " ";

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  function toggleFollowed() {
    setIsFollowed(!isFollowed);
  }

  return (
    <div>
      <NavBar />
      <ProfileContainer>
        <CenterContent>
          {isCurrentUser &&
            <EditButton>
            <Link to="/edit-user">
              {" "}
              <Icon name="edit" size="normal" />
            </Link>
          </EditButton>}
          {!isCurrentUser &&
            <EditButton>
              <FollowButton onClick={toggleFollowed} isFollowed={isFollowed}>{isFollowed? "Unfollow" : "Follow"}</FollowButton>
            </EditButton>}
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
  isCurrentUser:PropTypes.bool,
};

UserProfile.defaultProps = {
  isCurrentUser: false
};

export default UserProfile;
