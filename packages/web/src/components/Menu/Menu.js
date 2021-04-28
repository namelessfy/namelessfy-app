import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

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
import { Button } from "../../styles/formStyles";

function SeacrhModal({ show, close }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleBackClick(e) {
    if (e.target.id === "back") {
      close();
    }
  }

  const tab = " ";
  const fullname = currentUser.firstName + tab + currentUser.lastName;
  return (
    <>
      <Back isShowing={show} onClick={handleBackClick} id="back">
        <Background isShowing={show}>
          <CloseContainer>
            <AiOutlineCloseCircle type="button" id="back" onClick={close} />
          </CloseContainer>
          <RowDiv>
            <Link to="/user-page">
              <MenuImage
                src={
                  currentUser.porfileImage ||
                  "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                }
              />
            </Link>
            <Link to="/user-page">
              <ColumnDiv>
                <UserNameMenu>{currentUser.userName}</UserNameMenu>
                <FullName>{fullname}</FullName>
              </ColumnDiv>
            </Link>
          </RowDiv>

          <MediaContainer>
            <ColumnDiv>
              <h1>Liked Songs</h1>
              <RowDiv />
            </ColumnDiv>
            <ColumnDiv>
              <h1>Liked Albums</h1>
            </ColumnDiv>
            <ColumnDiv>
              <h1>Your Albums</h1>
            </ColumnDiv>
            <ColumnDiv>
              <h1>Your Playlists</h1>
            </ColumnDiv>{" "}
            <Button type="button" onClick={handleSignOut}>
              Sign Out
            </Button>
          </MediaContainer>
        </Background>
      </Back>
    </>
  );
}

SeacrhModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SeacrhModal;
