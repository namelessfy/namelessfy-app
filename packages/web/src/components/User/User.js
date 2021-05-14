import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as ROUTES from "../../routes";

import {
  UserCover,
  UserTitle,
  UserContainer,
  BottomContainer,
  InfoContainer,
} from "./style";

function User({ userInfo }) {
  const history = useHistory();

  function handleClick() {
    history.push(`${ROUTES.USER_PAGE}/${userInfo.userName}`);
  }

  return (
    <UserContainer>
      <UserCover
        src={
          userInfo.porfileImage ||
          "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
        }
        onClick={handleClick}
      />
      <BottomContainer>
        <InfoContainer>
          <UserTitle onClick={handleClick}>{userInfo.userName}</UserTitle>
        </InfoContainer>
      </BottomContainer>
    </UserContainer>
  );
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default User;
