import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../../redux/auth/auth-actions";

import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";

import * as ROUTES from "../../routes";

import {
  Background,
  Back,
  ColumnDiv,
  RowDiv,
  MenuImage,
  UserNameMenu,
  CloseContainer,
  FullName,
  MediaContainer,
} from "./style";
import { DeleteButton } from "../../styles/formStyles";
import { Icon } from "../../styles/mainStyles";

import PlaylistPreviewMenu from "../PlaylistPreviewMenu";
import MenuPlaylistList from "../MenuPlaylistList";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";

function Menu({ show, close }) {
  const dispatch = useDispatch();
  const User = useSelector(userSelector);
  const { myPlaylists } = useSelector(playlistSelector);
  const { favorites } = useSelector(songSelector);
  const { lastSongsPlayed } = useSelector(playerSelector);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleBackClick(e) {
    if (e.target.id === "back") {
      close();
    }
  }

  return (
    <>
      <Back isShowing={show} onClick={handleBackClick} id="back">
        <Background isShowing={show}>
          <CloseContainer>
            <Icon type="button" name="close" size="small" onClick={close} />
          </CloseContainer>
          <RowDiv>
            <Link to={`${ROUTES.USER_PAGE}/${User.currentUser.userName}`}>
              <MenuImage
                onClick={close}
                src={
                  User.currentUser.porfileImage ||
                  "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                }
              />
            </Link>
            <Link to={`${ROUTES.USER_PAGE}/${User.currentUser.userName}`}>
              <ColumnDiv>
                <UserNameMenu onClick={close}>
                  {User.currentUser.userName}
                </UserNameMenu>
                <FullName
                  onClick={close}
                >{`${User.currentUser.firstName}  ${User.currentUser.lastName}`}</FullName>
              </ColumnDiv>
            </Link>
          </RowDiv>

          <MediaContainer>
            <ColumnDiv>
              {favorites?.length > 0 && (
                <PlaylistPreviewMenu
                  title="Your favorite songs"
                  songs={favorites}
                />
              )}
            </ColumnDiv>
            <ColumnDiv>
              {lastSongsPlayed?.length > 0 && (
                <PlaylistPreviewMenu
                  title="Last songs played"
                  songs={lastSongsPlayed}
                />
              )}
            </ColumnDiv>
            <ColumnDiv onClick={close}>
              {myPlaylists?.length > 0 && (
                <MenuPlaylistList
                  playlists={myPlaylists}
                  title="My Playlists"
                />
              )}
            </ColumnDiv>{" "}
            <DeleteButton type="button" onClick={handleSignOut} lastItem>
              Sign Out
            </DeleteButton>
          </MediaContainer>
        </Background>
      </Back>
    </>
  );
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Menu;
