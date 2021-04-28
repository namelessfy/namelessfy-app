import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUserCircle } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";

import {
  UserName,
  Statistics,
  ProfileImageDefault,
  ProfileContainer,
  ButtonContainer,
  ProfileButton
} from "./styles";

import NavBar from "../Navbar";
import { Button, CenterContent } from "../../styles/formStyles";
import { authSelector } from "../../redux/auth/auth-selectors";
import UserNavBar from "./UserNavBar";

function UserProfile() {
  const { currentUser } = useSelector(authSelector);
  const tab = " ";

  return (
    <div>
      <NavBar />
      <ProfileContainer>
        <CenterContent>
          <ProfileButton>
            <Link to="/edit-user">
              {" "}
              <HiUserCircle />{" "}
            </Link>
          </ProfileButton>
          <ProfileImageDefault
            src={
              currentUser.porfileImage ||
              "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
            }
          />
        </CenterContent>
        <UserName>
          <h1>{currentUser.userName}</h1>
          <h4>{currentUser.firstName + tab + currentUser.lastName}</h4>
        </UserName>
        <Statistics>
          <div>
            <p>{currentUser.followers || "3.141.596 Followers"}</p>
            <p>{currentUser.followers || "4 Following"}</p>
          </div>
          <ProfileButton>
            <HiViewList />
          </ProfileButton>
        </Statistics>
        <ButtonContainer>
          <Button>Add Song</Button>
        </ButtonContainer>
        <UserNavBar />
      </ProfileContainer>
    </div>
  );
}

export default UserProfile;
