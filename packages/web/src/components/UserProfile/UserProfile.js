import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { userSelector } from "../../redux/user/user-selectors";
import { isIdInList } from "../../utils/favoritesUtils";
import { followUser, unfollowUser } from "../../redux/user/user-actions";

function UserProfile({
  user,
  songs,
  favorites,
  playlists,
  isCurrentUser,
  userFollowedUsers,
}) {
  const dispatch = useDispatch();
  const [isGrid, setIsGrid] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const { followedUsers } = useSelector(userSelector);
  const tab = " ";

  useEffect(() => {
    setIsFollowed(isIdInList(user?._id, followedUsers));
  }, [followedUsers, user]);

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  function toggleFollowed() {
    if (isFollowed) {
      dispatch(unfollowUser(user?._id));
    } else {
      dispatch(followUser(user?._id));
    }
  }

  return (
    <div>
      <NavBar />
      <ProfileContainer>
        <CenterContent>
          {isCurrentUser && (
            <EditButton>
              <Link to="/edit-user">
                {" "}
                <Icon name="edit" size="normal" />
              </Link>
            </EditButton>
          )}
          {!isCurrentUser && (
            <EditButton>
              <FollowButton onClick={toggleFollowed} isFollowed={isFollowed}>
                {isFollowed ? "Unfollow" : "Follow"}
              </FollowButton>
            </EditButton>
          )}
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
            <p>{`${user?.followedBy?.length} Followers`}</p>
            <p>{`${userFollowedUsers?.length} Following`}</p>
          </div>
          <ViewButton>
            <Icon
              onClick={toggleGrid}
              name={isGrid ? "toggleOn" : "toggleOff"}
              size="small"
            />
            <Icon
              onClick={toggleGrid}
              name={isGrid ? "grid" : "list"}
              size="small"
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
  isCurrentUser: PropTypes.bool,
  userFollowedUsers: PropTypes.array.isRequired,
};

UserProfile.defaultProps = {
  isCurrentUser: false,
};

export default UserProfile;
