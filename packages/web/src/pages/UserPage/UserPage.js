import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Main } from "../../styles/mainStyles";
import UserProfile from "../../components/UserProfile/UserProfile";

import { getMySongs } from "../../redux/song/song-actions";

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySongs());
  }, []);

  return (
    <Main>
      <UserProfile />
    </Main>
  );
}

export default UserPage;
