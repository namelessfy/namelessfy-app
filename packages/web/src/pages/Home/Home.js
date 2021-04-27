import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";
import { getFavorites } from "../../redux/user/user-actions";

function Home() {
  const dispatch = useDispatch();
  const { currentUser, favorites } = useSelector(userSelector);
  const { isShuffle, queue, shuffleQueue, preQueue } = useSelector(
    playerSelector,
  );
  const [fullQueue, setFullQueue] = useState([]);
  const [hasAllInfo, setHasAllInfo] = useState(false);
  useEffect(() => {
    if (hasAllInfo) {
      dispatch(getFavorites());
    }
  }, [hasAllInfo]);

  useEffect(() => {
    setHasAllInfo(hasUserAllInfo(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (isShuffle) {
      setFullQueue([...preQueue, ...shuffleQueue]);
    } else {
      setFullQueue([...preQueue, ...queue]);
    }
  }, [preQueue, isShuffle, queue, shuffleQueue]);

  if (!hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main>
      <Navbar />
      <Container>
        <PlaylistPreview title="Queue" songs={fullQueue} />
        {favorites.length > 0 && (
          <PlaylistPreview title="Liked Songs" songs={favorites} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
