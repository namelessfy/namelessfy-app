import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

/* import { AiOutlineCloseCircle } from "react-icons/ai"; */

import { signOut } from "../../redux/auth/auth-actions";
import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { getFavorites, getMySongs } from "../../redux/song/song-actions";

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
import { Button, CenterContent } from "../../styles/formStyles";

import PlaylistPreview from "../PlaylistPreview";
import { Icon } from "../../styles/mainStyles";

function Menu({ show, close }) {
  const dispatch = useDispatch();
  const User = useSelector(userSelector);
  const { favorites, mySongs } = useSelector(songSelector);
  const [hasAllInfo, setHasAllInfo] = useState(false);
  const [hasMySongs, setHasMySongs] = useState(false);

  useEffect(() => {
    if (hasAllInfo && !hasMySongs) {
      dispatch(getMySongs());
    }
  }, [hasAllInfo, hasMySongs]);

  useEffect(() => {
    if (mySongs) {
      setHasMySongs(true);
    }
  }, [mySongs]);

  useEffect(() => {
    if (hasAllInfo) {
      dispatch(getFavorites());
    }
  }, [hasAllInfo]);

  useEffect(() => {
    setHasAllInfo(hasUserAllInfo(User.currentUser));
  }, [User.currentUser]);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleBackClick(e) {
    if (e.target.id === "back") {
      close();
    }
  }

  const tab = " ";
  const fullname = User.currentUser.firstName + tab + User.currentUser.lastName;
  return (
    <>
      <Back isShowing={show} onClick={handleBackClick} id="back">
        <Background isShowing={show}>
          {
            <CloseContainer>
              {/* <AiOutlineCloseCircle type="button" id="back" onClick={close} /> */}
              <Icon type="button" name="close" size="small" onClick={close} />
            </CloseContainer>
          }
          <CenterContent>
            <RowDiv>
              <Link to="/user-page">
                <MenuImage
                  src={
                    User.currentUser.porfileImage ||
                    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                  }
                />
              </Link>
              <Link to="/user-page">
                <ColumnDiv>
                  <UserNameMenu>{User.currentUser.userName}</UserNameMenu>
                  <FullName>{fullname}</FullName>
                </ColumnDiv>
              </Link>
            </RowDiv>

            <MediaContainer>
              <ColumnDiv>
                <h1>Liked Songs</h1>
                {favorites?.length > 0 && (
                  <PlaylistPreview title="Liked Songs" songs={favorites} />
                )}
                <RowDiv />
              </ColumnDiv>
              <ColumnDiv>
                <h1>Liked Albums</h1>
                {/* <PlaylistPreview title="Albums">ALbums</PlaylistPreview>
              </ColumnDiv>
              <ColumnDiv>
                <h1>Your Albums</h1>
                <PlaylistPreview title="Your Albums">
                  Your Albums
                </PlaylistPreview>
              </ColumnDiv>
              <ColumnDiv>
                <h1>Your Playlists</h1>
                <PlaylistPreview title="Your Playlists">
                  Ypur Playlists
                </PlaylistPreview> */}
              </ColumnDiv>{" "}
              <Button type="button" onClick={handleSignOut} lastItem>
                Sign Out
              </Button>
            </MediaContainer>
          </CenterContent>
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
